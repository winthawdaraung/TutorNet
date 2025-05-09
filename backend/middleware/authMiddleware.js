import jwt from 'jsonwebtoken';
import Student from '../models/studentsModel.js';
import Tutor from '../models/tutorsModel.js';

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Try to find user in both Student and Tutor collections
            let user = await Student.findById(decoded.id).select('-password');
            if (!user) {
                user = await Tutor.findById(decoded.id).select('-password');
            }

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Not authorized, user not found'
                });
            }

            req.user = user;
            next();
        } catch (error) {
            res.status(401).json({
                success: false,
                message: 'Not authorized, token failed'
            });
        }
    }

    if (!token) {
        res.status(401).json({
            success: false,
            message: 'Not authorized, no token'
        });
    }
};