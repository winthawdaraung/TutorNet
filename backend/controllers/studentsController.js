import Student from "../models/studentsModel.js";
import Tutor from "../models/tutorsModel.js";
import { hashPassword } from "../config/utils.js";

export const registerStudent = (async (req, res) => {
    const { fullName, email, password, studentId, institution, year } = req.body;
    try {
        const existingStudent = await Student.findOne({ email });
        const existingTutor = await Tutor.findOne({ email });

        if (existingStudent || existingTutor) {
            return res.status(400).json({ message: "User with this email already exists!" });
        }
        const hashedPassword = await hashPassword(password);
        const student = await Student.create({ fullName, email, password: hashedPassword, studentId, institution, year });
        res.status(201).json({ success: true, message: "Student registered successfully", student });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export const updateStudent = (async (req, res) => {
    const { studentId } = req.params;
    const { fullName, email, password, institution, year } = req.body;
    try {
        const student = await Student.findOneAndUpdate(studentId, { fullName, email, password, institution, year }, { new: true });
        res.status(200).json({ success: true, message: "Student updated successfully", student });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export const sendRequest = (async (req, res) => {
    const { studentId, tutorId, bookingDate, bookingTime, bookingDuration, subject, comment } = req.body;
    try {
        const student = await Student.findById(studentId);
        const tutor = await Tutor.findById(tutorId);
        if (!student || !tutor) {
            return res.status(404).json({ message: "Student or Tutor not found" });
        }
        const booking = await Booking.create({ studentId, tutorId, bookingDate, bookingTime, bookingDuration, subject, comment });
        res.status(201).json({ success: true, message: "Booking request sent successfully", booking });
    } catch (error) {     
        res.status(500).json({ success: false, message: error.message });
    }
}
);
