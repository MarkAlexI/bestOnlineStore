import mongoose from 'mongoose';

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
  raiting: { type: Number, default: 3 },
  characteristics: {
    material: { type: String },
    filling: { type: String },
    sizes: [{ type: String }],
    color: [{ type: String }],
    ergonomics: { type: String },
    load: { type: String },
    functions: { type: String },
    additional: { type: String },
    care: { type: String }
  },
  numReviews: { type: Number, default: 0 },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }]
}, { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
