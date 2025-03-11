// reviewModel.js
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  tutorId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Tutor',
    required: false
  },
  studentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Student',
    required: true 
  },
  rating: { 
    type: Number, 
    min: 1,
    max: 5,
    required: true //
  },
  comment: { 
    type: String, 
    required: true 
  },
  isGeneralReview: {
    type: Boolean,
    default: false
  },
}, { timestamps: true });

const Review = mongoose.model("Review", reviewSchema);
export default Review;