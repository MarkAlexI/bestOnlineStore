import Cart from '../models/cartSchema.js';
import User from '../models/userSchema.js';
import Product from '../models/productSchema.js';
import { MESSAGES } from '../utils/constants.js';

class CartService {
  static async addToCart(userId, productId, quantity) {
    const user = await User.findById(userId);
    const product = await Product.findById(productId);

    if (!user || !product) {
      return { message: MESSAGES.PRODUCT_NOT_FOUND, cart: null };
    }

    let cart = await this.findLatestCart(userId);

    if (!cart) {
      const newCart = new Cart({ user: userId, items: [] });
      cart = await newCart.save();
    }

    const cartItemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (cartItemIndex === -1) {
      const cartItem = {
        name: product.name,
        price: product.price,
        image: product.baseImage,
        product: productId,
        quantity: quantity
      };
      cart.items.push(cartItem);
    } else {
      if (quantity === 0) {
        cart.items = cart.items.filter(item => item.product.toString() !== productId);
      } else {
        const cartItem = cart.items[cartItemIndex];
        cartItem.quantity = quantity;
      }
    }

    cart.totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

    await cart.save();

    const message = quantity > 0
      ? MESSAGES.PRODUCT_UPDATED_IN_CART
      : MESSAGES.PRODUCT_REMOVED_FROM_CART;

    return { message, cart };
  }

  static async getCart(userId) {
    const cart = await this.findLatestCart(userId);
    if (!cart) {
      return { message: MESSAGES.CONSUMER_CART_EMPTY, cart: null };
    }
    return { message: MESSAGES.USER_CART_IN_PAYLOAD, cart };
  }

  static async clearCart(userId) {
    const cart = await this.findLatestCart(userId);
    if (!cart) {
      return { message: MESSAGES.CONSUMER_CART_EMPTY, cart: null };
    }

    cart.items = [];
    cart.totalPrice = 0;

    await cart.save();

    return { message: MESSAGES.CART_CLEARED_SUCCESSFULLY, cart };
  }

  static async findLatestCart(userId) {
    return Cart.findOne({ user: userId }).sort({ createdAt: -1 }).limit(1).exec();
  }
}

export default CartService;
