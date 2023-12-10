import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: false },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  password: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: false },
  isAdmin: { type: Boolean, required: true, default: false },
  isAnonymous: { type: Boolean, default: false },
  resetPasswordToken: { type: String, default: '' },
  resetPasswordExpires: { type: Number, default: 0 },
  shippingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ShippingAddress',
  },
  wishList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  reviews: [{
    type: mongoose.Schema.Types.ObjectId
  }],
}, { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
