import Review from '../models/reviewSchema.js';

const calculateNewRating = async (product) => {
  const reviewIds = product.reviews;
  let totalRating = 0;

  const reviews = await Review.find({ _id: { $in: reviewIds } });

  for (const review of reviews) {
    totalRating += review.rating;
  }

  const newAverageRating = totalRating/reviewIds.length;

  product.rating = newAverageRating;
  product.numReviews = reviewIds.length;

  return product;
};

export default calculateNewRating;
