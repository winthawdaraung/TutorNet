import Student from "../models/studentsModel.js";
import Tutor from "../models/tutorsModel.js";
import { comparePassword, generateToken, createResetToken, sendPasswordResetEmail } from "../config/utils.js";

export const login = async (req, res) => {
  try {
      const { email, password } = req.body;
      console.log(email, password);
      
      // Check for required fields
      if (!email || !password) {
          return res.status(400).json({ success: false, message: "Email and password are required" });
      }
      
      let user = await Student.findOne({ email });
      
      if (!user) {
          user = await Tutor.findOne({ email });
          if (!user) {
              return res.status(404).json({ success: false, message: "User not found" });
          }
      }

      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
          return res.status(401).json({ success: false, message: "Invalid password" });
      }

      // Create a user object without the password for the response
      const userToSend = user.toObject();
      delete userToSend.password;

      const token = generateToken(user._id, res);
      res.status(200).json({ 
          success: true, 
          message: "Login successful",  
          user: userToSend, 
          token 
      });

  } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ success: false, type: "catch",message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
      res.clearCookie('token');
      res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({ success: false, message: error.message });
  }
};

export const forgetPassword = async (req, res) => {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }
    
    try {
      const student = await Student.findOne({ email });
      const tutor = await Tutor.findOne({ email });
      
      if (!student && !tutor) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      
      const user = student || tutor;
      const userType = student ? 'student' : 'tutor';
      
      const resetToken = createResetToken(user._id);
      
      // Send email with reset link
      const emailSent = await sendPasswordResetEmail(email, resetToken, userType);
      
      if (!emailSent) {
        return res.status(500).json({ 
          success: false, 
          message: "Failed to send password reset email" 
        });
      }
      
      res.status(200).json({ 
        success: true, 
        message: "Password reset link sent to your email" 
      });
    } catch (error) {
      console.error('Forget password error:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  // Add this new controller function for handling the actual password reset
  export const resetPassword = async (req, res) => {
    const { token, newPassword, userType } = req.body;
    
    if (!token || !newPassword || !userType) {
      return res.status(400).json({ 
        success: false, 
        message: "Token, new password, and user type are required" 
      });
    }
    
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_RESET_SECRET || 'reset-token-secret');
      
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      
      // Update password based on user type
      let updated;
      if (userType === 'student') {
        updated = await Student.findByIdAndUpdate(
          decoded.id,
          { password: hashedPassword },
          { new: true }
        );
      } else if (userType === 'tutor') {
        updated = await Tutor.findByIdAndUpdate(
          decoded.id,
          { password: hashedPassword },
          { new: true }
        );
      }
      
      if (!updated) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      
      res.status(200).json({ success: true, message: "Password has been reset successfully" });
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ 
          success: false, 
          message: "Password reset link has expired. Please request a new one." 
        });
      }
      
      console.error('Reset password error:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  };