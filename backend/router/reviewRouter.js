import express from "express";
import { submitReview, getTutorReviews } from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js"; // Ensure only logged-in users can submit

const router = express.Router();

// Base route for generic reviews
//router.post("/", protect, submitReview);

// Route with tutorId parameter
router.post("/:tutorId", protect, submitReview);

// Route to get all reviews for a tutor
router.get("/:tutorId", getTutorReviews);


export default router;
