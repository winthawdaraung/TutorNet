import Tutor from "../models/tutorsModel.js";
import Student from "../models/studentsModel.js";
import { hashPassword } from "../config/utils.js";

export const registerTutor = (async (req, res) => {
    const { fullName, email, password, experience, subjects, profilePicture } = req.body;
    try {
        const existingTutor = await Tutor.findOne({ email });
        const existingStudent = await Student.findOne({ email });

        if (existingTutor || existingStudent) {
            return res.status(400).json({ message: "User with this email already exists!" });
        }
        const hashedPassword = await hashPassword(password);
        const tutor = await Tutor.create({ fullName, email, password: hashedPassword, experience, subjects, profilePicture });
        res.status(201).json({ success: true, message: "Tutor registered successfully", tutor });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

export const getTutors = (async (req, res) => {
    try {
        const tutors = await Tutor.find();
        res.status(200).json({ success: true, tutors });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

export const getTutorById = (async (req, res) => {
    try {
        const tutor = await Tutor.findById(req.params.id);
        if (!tutor) {
            return res.status(404).json({ success: false, message: "Tutor not found" });
        }
        res.status(200).json({ success: true, tutor });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

export const updateTutor = (async (req, res) => {
    try {
        const tutor = await Tutor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!tutor) {
            return res.status(404).json({ success: false, message: "Tutor not found" });
        }
        res.status(200).json({ success: true, tutor });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

export const deleteTutor = (async (req, res) => {
    try {
        const tutor = await Tutor.findByIdAndDelete(req.params.id);
        if (!tutor) {
            return res.status(404).json({ success: false, message: "Tutor not found" });
        }
        res.status(200).json({ success: true, message: "Tutor deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});


