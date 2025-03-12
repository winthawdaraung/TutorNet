import mongoose from 'mongoose';
import Review from '../models/reviewsModel.js';
import Student from '../models/studentsModel.js';
import Tutor from '../models/tutorsModel.js';

// Add a review
export const addReview = async (req, res) => {
    try {
        const { studentId, tutorId, rating, comment } = req.body;

        if (!studentId || !tutorId || !rating || !comment) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Check if student exists
        const student = await Student.findById(studentId);
        if (!student) return res.status(404).json({ error: "Student not found." });

        // Check if tutor exists
        const tutor = await Tutor.findById(tutorId);
        if (!tutor) return res.status(404).json({ error: "Tutor not found." });

        // Save Review
        const newReview = new Review({ studentId, tutorId, rating, comment });
        await newReview.save();

        // Update tutor's reviewsCount and rating
        const allReviews = await Review.find({ tutorId });
        const reviewCount = allReviews.length;
        const averageRating = reviewCount > 0 
            ? (allReviews.reduce((acc, r) => acc + r.rating, 0) / reviewCount).toFixed(1) 
            : 0;

        // Update tutor document with new rating and review count
        await Tutor.findByIdAndUpdate(tutorId, {
            reviewsCount: reviewCount,
            rating: averageRating
        });

        res.status(201).json({ success: true, message: "Review added successfully." });
    } catch (error) {
        res.status(500).json({ error: "Server error: " + error.message });
    }
};

// Get reviews for a tutor
export const getTutorReviews = async (req, res) => {
    try {
        const { tutorId } = req.params;

        const objectTutorId = new mongoose.Types.ObjectId(tutorId); //converting string to objectid

        const reviews = await Review.find({ tutorId: objectTutorId }).populate("studentId", "fullName profileImageUrl");

        const reviewCount = reviews.length;
        const averageRating = reviewCount > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviewCount).toFixed(1) : 0;

        // Log to check the data
        console.log({ reviews, reviewCount, averageRating });

        res.json({ reviews, reviewCount, averageRating });
    } catch (error) {
        res.status(500).json({ error: "Server error: " + error.message });
    }
};
