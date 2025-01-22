const calculateNewRating = async (product) => {
  const reviews = product.reviews.slice();
  let totalRating = 0;

  if (reviews.length > 0) {
    for (const review of reviews) {
      totalRating += review.rating;
    }

    const newAverageRating = totalRating/reviews.length;

    product.rating = newAverageRating;
  } else {
    product.rating = 3;
  }

  product.numReviews = reviews.length;

  return product;
};

export default calculateNewRating;
