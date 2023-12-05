import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, default: '' }
}, { timestamps: true });

const Article = mongoose.model('Article', articleSchema);

export default Article;
