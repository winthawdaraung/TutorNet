import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    tutorId: { type: mongoose.Schema.Types.ObjectId, ref: "Tutor", required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now }
});
  
const Review = mongoose.model('Review', reviewSchema);
export default Review;