import Product from '../models/productSchema.js';

const buildProductQuery = (queryParams) => {
  const query = Product.find().populate('reviews');
  if (queryParams.minPrice) {
    query.where('price').gte(parseInt(queryParams.minPrice, 10));
  }
  if (queryParams.maxPrice) {
    query.where('price').lte(parseInt(queryParams.maxPrice, 10));
  }
  if (queryParams.category) {
    query.where('category').equals(queryParams.category);
  }
  if (queryParams.subcategory) {
    query.where('subcategory').equals(queryParams.subcategory);
  }
  if (queryParams.sortByPrice) {
    const sortOrder = queryParams.sortByPrice === 'asc' ? 1 : -1;
    query.sort({ price: sortOrder });
  }
  if (queryParams.sortByRating) {
    const sortOrder = queryParams.sortByRating === 'asc' ? 1 : -1;
    query.sort({ rating: sortOrder });
  }
  return query;
};

export default buildProductQuery;
