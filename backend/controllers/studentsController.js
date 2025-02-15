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

