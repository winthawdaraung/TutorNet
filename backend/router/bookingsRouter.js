import express from "express";
import { createBooking, getStudentBookings, getTutorBookings, updateBookingStatus } from "../controllers/bookingsController.js";
import { protect } from "../middleware/authMiddleware.js";

const bookingsRouter = express.Router();

bookingsRouter.post("/", protect, createBooking); // Student requests a booking
bookingsRouter.get("/student", protect, getStudentBookings); // Student views their bookings
bookingsRouter.get("/tutor", protect, getTutorBookings); // Tutor views bookings they received
bookingsRouter.patch("/:bookingId", protect, updateBookingStatus); // Update booking status

export default bookingsRouter;
