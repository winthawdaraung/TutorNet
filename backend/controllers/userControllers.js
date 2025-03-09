import Student from "../models/studentsModel.js";
import Tutor from "../models/tutorsModel.js";
import { hashPassword, comparePassword, generateToken, generateResetToken, sendPasswordResetEmail } from "../config/utils.js";

// Find user in both Student and Tutor collections
const findUserByEmail = async (email) => {
    const student = await Student.findOne({ email });
    if (student) return { user: student, role: 'student' };
    
    const tutor = await Tutor.findOne({ email });
    if (tutor) return { user: tutor, role: 'tutor' };
    
    return null;
};

// Find user by reset token
const findUserByResetToken = async (token) => {
    const student = await Student.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
    });
    if (student) return { user: student, role: 'student' };

    const tutor = await Tutor.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
    });
    if (tutor) return { user: tutor, role: 'tutor' };

    return null;
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user in both collections
        const userInfo = await findUserByEmail(email);
        if (!userInfo) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const { user, role } = userInfo;

        // Check password
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Generate token
        const token = generateToken(user._id, role);

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                email: user.email,
                fullName: user.fullName,
                role: role
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: "Error logging in"
        });
    }
};

export const logout = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "Logout successful"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error logging out"
        });
    }
};

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const userInfo = await findUserByEmail(email);
        
        if (!userInfo) {
            return res.status(404).json({
                success: false,
                message: "No account with that email exists"
            });
        }

        const resetToken = generateResetToken();
        const user = userInfo.user;

        // Save reset token and expiry
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        // Send reset email
        await sendPasswordResetEmail(email, resetToken);

        res.status(200).json({
            success: true,
            message: "Password reset email sent"
        });
    } catch (error) {
        console.error('Error in forgotPassword:', error);
        console.log('forgotPassword error:', error);
        res.status(500).json({
            success: false,
            // message: "Error sending password reset email"
            message: error.message
        });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        
        // Find user with valid reset token
        const userInfo = await findUserByResetToken(token);
        if (!userInfo) {
            return res.status(400).json({
                success: false,
                message: "Password reset token is invalid or has expired"
            });
        }

        const user = userInfo.user;

        // Hash new password and save
        user.password = await hashPassword(newPassword);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password has been reset successfully",
            role: userInfo.role
        });
    } catch (error) {
        console.error('Error in resetPassword:', error);
        res.status(500).json({
            success: false,
            message: "Error resetting password"
        });
    }
};

