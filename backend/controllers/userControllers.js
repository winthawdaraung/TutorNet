import Student from "../models/studentsModel.js";
import Tutor from "../models/tutorsModel.js";
import { comparePassword, generateToken } from "../config/utils.js";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // First try to find in students
        let user = await Student.findOne({ email });
        
        // If not found in students, try tutors
        if (!user) {
            user = await Tutor.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }

        generateToken(user._id, res);
        res.status(200).json({ success: true, message: "Login successful", user });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const logout = (async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ success: true, message: "Logged out successfully" });
});

