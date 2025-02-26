import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = (userID, res) => {
    const token = jwt.sign({ id: userID }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, { 
        httpOnly: true, // prevent client side access
        secure: process.env.NODE_ENV !== 'development', // only send over https
        sameSite: 'strict', // prevent CSRF attacks
        maxAge: 7 * 24 * 60 * 60 * 1000 }); // 7 days
    return token;
};

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};


export const createResetToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_RESET_SECRET || 'reset-token-secret',
    { expiresIn: '1h' }
  );
};


const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});


export const sendPasswordResetEmail = async (email, token, userType) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}/${userType}`;
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset Request',
    html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
        <p>You requested a password reset. Please click the button below to reset your password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">Reset Password</a>
        </div>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email and your password will remain unchanged.</p>
        <hr style="border: 1px solid #eee; margin: 20px 0;" />
        <p style="color: #777; font-size: 12px; text-align: center;">This is an automated email, please do not reply.</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
};