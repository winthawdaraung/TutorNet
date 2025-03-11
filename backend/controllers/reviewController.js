import Review from "../models/reviewModel.js";
import Student from "../models/studentsModel.js";
import Tutor from "../models/tutorsModel.js";

//Submit a Reviewt
export const submitReview = async (req, res) => {
  const tutorId = req.params.tutorId; // Correct way to get tutorId from the URL
  const { rating, comment } = req.body;
  const studentId = req.user._id;

  try {
    // Validate that rating is between 1 and 5
    // if (rating < 1 || rating > 5) {
    //   return res.status(400).json({ message: "Rating must be between 1 and 5" });
    // }

    // Check if tutor exists
    const tutor = await Tutor.findById(tutorId);
    if (!tutor) {
      return res.status(404).json({ message: "Tutor not found" });
    }

    const review = new Review({
      studentId,
      tutorId, // Only include tutorId here (no need for the generic check anymore)
      rating,
      comment,
    });

    // Save the review to the Review model
    await review.save();

    // Update the tutor's rating and reviews count
    tutor.reviews.push(review._id);

    const reviews = await Review.find({ tutorId: tutor._id });
    const totalRating = reviews.reduce((acc, rev) => acc + rev.rating, 0);
    tutor.rating = reviews.length > 0 ? totalRating / reviews.length : 0;
    tutor.reviewsCount = reviews.length;

    await tutor.save();

    res.status(201).json({ message: "Review submitted successfully", review });
  } catch (error) {
    res.status(500).json({ message: "Error submitting review", error: error.message });
  }
};



//Get Tutor Reviews
export const getTutorReviews = async (req, res) => {
  const { tutorId } = req.params;

  try {
    // Find reviews for the given tutor
    const reviews = await Review.find({ tutorId }).populate('studentId', 'name');
    
    if (reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found for this tutor' });
    }

    // Calculate the total rating and review count for the tutor
    const totalRating = reviews.reduce((acc, rev) => acc + rev.rating, 0);
    const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

    res.status(200).json({
      reviews,
      totalRating,
      averageRating,
      reviewsCount: reviews.length,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
};

