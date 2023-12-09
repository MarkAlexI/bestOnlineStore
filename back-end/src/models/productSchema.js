import mongoose from 'mongoose';

const characteristicsSchema = new mongoose.Schema({
  _id: false,
  key: String,
  value: String
});

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  rating: { type: Number, required: true },
  comment: { type: String },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 }
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: false },
  descr: { type: String, required: true },
  shortDescr: { type: String, default: 'Item.' },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  promotion: { type: Boolean, default: false },
  baseImage: { type: String, default: '' },
  allImages: { type: [String], default: [''] },
  brand: { type: String, default: 'Brand' },
  category: {
    type: String,
    enum: ['Меблі', 'Сантехніка', 'Освітлення', 'Аксесуари', 'Інше'],
    default: 'Меблі'
  },
  subcategory: { type: String, default: '' },
  instock: { type: Boolean, default: true },
  countInStock: { type: Number, default: 0 },
  rating: { type: Number, default: 3 },
  characteristics: [characteristicsSchema],
  numReviews: { type: Number, default: 0 },
  viewed: { type: Number, default: 0 },
  reviews: [reviewSchema],
  new: { type: Boolean, default: true }
}, { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
