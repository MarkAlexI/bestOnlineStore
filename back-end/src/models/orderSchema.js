import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
    required: true,
  },
  shippingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ShippingAddress',
    required: true,
  },
  paymentResult: { id: String, status: String,
    update_time: String, email_address: String },
  paymentMethod: { type: String, default: 'Cash' },
  itemsPrice: { type: Number, required: true },
  deliveryPrice: { type: Number, default: 0 },
  totalPrice: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ['Комплектується', 'Відправлено', 'Отримано'],
    default: 'Комплектується'
  },
  user: { type: mongoose.Schema.Types.ObjectId,
    ref: 'User', required: true },
  isPaid: { type: Boolean, default: false },
  paidAt: { type: Date },
}, { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
