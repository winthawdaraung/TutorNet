import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
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

export const sendEmail = (email, subject, message) => {
    
};