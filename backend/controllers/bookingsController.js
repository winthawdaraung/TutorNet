import Booking from "../models/bookingModel.js";
import Student from "../models/studentsModel.js";
import Tutor from "../models/tutorsModel.js";
//import Notification from "../models/notificationModel.js";

export const createBooking = async (req, res) => {
    try {
        const { tutorId, startDate, fromTime, toTime, subject, comment } = req.body;
        const studentId = req.user.id; // Extract studentId from the authenticated user
        
        // Check if student and tutor exist
        const student = await Student.findById(studentId);
        const tutor = await Tutor.findById(tutorId);
        
        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }
        
        if (!tutor) {
            return res.status(404).json({ success: false, message: "Tutor not found" });
        }

        // Create booking with required fields (startDate, fromTime, toTime)
        const newBooking = await Booking.create({
            studentId,
            tutorId,
            startDate,  // from the request body
            fromTime,   // from the request body
            toTime,     // from the request body
            subject,
            comment,
            status: "pending"
        });

        // Create notification for the tutor
        /*await Notification.create({
            userId: tutorId,
            message: `New booking request from ${student.fullName} for ${subject} on ${startDate} from ${fromTime} to ${toTime}.`,
            status: "unread"
        });*/

        res.status(201).json({ success: true, message: "Booking request sent successfully", booking: newBooking });
    } catch (error) {
        console.error("Booking creation error:", error);
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
        /*await Notification.create({
            userId: booking.studentId,
            message: `Your booking with tutor has been ${status}.`,
            status: "unread"
        });*/

        res.status(200).json({ success: true, message: `Booking ${status} successfully`, booking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
