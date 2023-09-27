import Order from '../models/orderSchema.js';

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'name');
    res.json({
      message: 'success',
      text: 'All orders in payload.',
      payload: {
        orders
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'falt',
      text: 'Internal Server Error.'
    });
  }
};

const getUserCart = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json({
      message: 'success',
      text: 'Your cart in payload.',
      payload: {
        orders
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'falt',
      text: 'Internal Server Error.'
    });
  }
};

const createNewOrder = async (req, res) => {
  try {
    if (req.body.orderItems.length === 0) {
      res.status(400).json({
        message: 'falt',
        text: 'Cart is empty.'
      });
    } else {
      const order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
        isPaid: true,
        paidAt: Date.now(),
        paymentResult: {
          id: 'real_payment_id',
          status: 'success',
          update_time: Date.now(),
          email_address: req.user.email,
        },
      });

      const createdOrder = await order.save();
      res.status(201).json({
        message: 'success',
        text: 'New order created.',
        payload: {
          order: createdOrder
        }
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'falt',
      text: 'Internal Server Error.'
    });
  }
};

const getOrderById = async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (order) {
        res.json({
          message: 'success',
          text: 'Your order in payload.',
          payload: {
            order
          }
        });
      } else {
        res.status(404).json({
          message: 'falt',
          text: 'Order was not found.'
        });
      }
    } catch (error) {
      res.status(500).json({
        message: 'falt',
        text: 'Internal Server Error.'
      });
    }
  };
  
  const updateOrderToPaid = async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: req.body.id,
          status: 'success',
          update_time: Date.now(),
          email_address: req.user.email,
        };
        const updatedOrder = await order.save();
        res.json({
          message: 'success',
          text: 'Order has been paid.',
          payload: {
            order: updatedOrder
          }
        });
      } else {
        res.status(404).json({
          message: 'falt',
          text: 'Order was not found.'
        });
      }
    } catch (error) {
      res.status(500).json({
        message: 'falt',
        text: 'Internal Server Error.'
      });
    }
  };
  
  const deleteOrder = async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (order) {
        const deletedOrder = await order.remove();
        res.json({
          message: 'success',
          text: 'Order was deleted.',
          payload: {
            order: deletedOrder
          }
        });
      } else {
        res.status(404).json({
          message: 'falt',
          text: 'Order was not found.'
        });
      }
    } catch (error) {
      res.status(500).json({
        message: 'falt',
        text: 'Internal Server Error.'
      });
    }
  };

export {
  getOrders,
  getUserCart,
  createNewOrder,
  getOrderById,
  updateOrderToPaid,
  deleteOrder
};
