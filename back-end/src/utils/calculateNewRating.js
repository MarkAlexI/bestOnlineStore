const calculateNewRating = (currentRating, totalReviews, newReviewRating) => {
  const newRating = ((currentRating * totalReviews) + newReviewRating)/(totalReviews + 1);

  return newRating;
};

export default calculateNewRating;
