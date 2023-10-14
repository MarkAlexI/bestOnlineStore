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
  paymentMethod: { type: String, required: false },
  itemsPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ['Комплектується', 'Отримано'],
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
