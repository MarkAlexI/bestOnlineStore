import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  product: { type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', required: true }
});

const shoppingCartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId,
    ref: 'User', required: true },
  items: [cartItemSchema],
  totalPrice: { type: Number, default: 0 }
}, { timestamps: true }
);

const Cart = mongoose.model('Cart', shoppingCartSchema);

export default Cart;
