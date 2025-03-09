import Booking from "../models/bookingModel.js";
import Student from "../models/studentsModel.js";
import Tutor from "../models/tutorsModel.js";
import Notification from "../models/notificationModel.js";

export const createBooking = async (req, res) => {
    try {
        const { studentId, tutorId, bookingDate, bookingTime, bookingDuration, subject, comment } = req.body;

        // Check if student and tutor exist
        const student = await Student.findById(studentId);
        const tutor = await Tutor.findById(tutorId);
        
        if (!student || !tutor) {
            return res.status(404).json({ success: false, message: "Student or tutor not found" });
        }

        // Create booking
        const newBooking = await Booking.create({
            studentId,
            tutorId,
            bookingDate,
            bookingTime,
            bookingDuration,
            subject,
            comment,
            status: "pending"
        });

        // Create notification for the tutor
        await Notification.create({
            userId: tutorId,
            message: `New booking request from ${student.fullName} for ${subject} on ${bookingDate} at ${bookingTime}.`,
            status: "unread"
        });

        res.status(201).json({ success: true, message: "Booking request sent successfully", booking: newBooking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getStudentBookings = async (req, res) => {
    try {
        const studentId = req.user.id;
        const bookings = await Booking.find({ studentId }).sort({ bookingDate: -1 });

        res.status(200).json({ success: true, bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getTutorBookings = async (req, res) => {
    try {
        const tutorId = req.user.id;
        const bookings = await Booking.find({ tutorId }).sort({ bookingDate: -1 });

        res.status(200).json({ success: true, bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateBookingStatus = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const { status } = req.body; // "accepted", "completed", "declined"

        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }

        booking.status = status;
        await booking.save();

        // Notify student about status update
        await Notification.create({
            userId: booking.studentId,
            message: `Your booking with tutor has been ${status}.`,
            status: "unread"
        });

        res.status(200).json({ success: true, message: `Booking ${status} successfully`, booking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
