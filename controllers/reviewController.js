const Review = require("../models/reviewsModel");

const CreateReviw = async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const GetReviewByID = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const GetServiceReviewsById = async (req, res) => {
  try {
    const reviews = await Review.find({
      serviceCenterId: req.params.serviceCenterId,
    });
    if (!reviews.length)
      return res
        .status(404)
        .json({ message: "No reviews found for this service center" });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  CreateReviw,
  GetReviewByID,
  GetServiceReviewsById,
};