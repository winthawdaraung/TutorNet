import express from "express";
import { createBooking,/* getStudentBookings,*/ getTutorBookings, updateBookingStatus } from "../controllers/bookingsController.js";
import { protect } from "../middleware/authMiddleware.js";

const bookingsRouter = express.Router();

// Create booking routes
bookingsRouter.post("/create", protect, createBooking); // Main booking creation endpoint

// Get bookings routes
//bookingsRouter.get("/student", protect, getStudentBookings); // Student views their bookings
bookingsRouter.get("/tutor", protect, getTutorBookings); // Tutor views bookings they received

// Update booking status
bookingsRouter.patch("/:bookingId/status", protect, updateBookingStatus); // Update booking status

export default bookingsRouter;