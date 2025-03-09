import express from "express";
import { createBooking, getStudentBookings, getTutorBookings, updateBookingStatus } from "../controllers/bookingsController.js";
import { protect } from "../middleware/authMiddleware.js";

const bookingsRouter = express.Router();

bookingsRouter.post("/create", protect, createBooking); // Student requests a booking
bookingsRouter.post("/:tutorId", protect, createBooking); // student request a booking for a specific tutor
bookingsRouter.get("/students/bookings", protect, getStudentBookings); // Student views their bookings
bookingsRouter.get("/tutors/bookings", protect, getTutorBookings); // Tutor views bookings they received
//bookingsRouter.put("/update/status", protect, updateTutorBookings)
bookingsRouter.patch("/:bookingId", protect, updateBookingStatus); // Update booking status

export default bookingsRouter;
