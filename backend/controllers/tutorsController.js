import Tutor from "../models/tutorsModel.js";
import Student from "../models/studentsModel.js";
import { hashPassword } from "../config/utils.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const registerTutor = async (req, res) => {
    try {
        const { fullName, email, password, institution, subjectsOffered, experience } = req.body;

        // Check if tutor already exists
        const existingTutor = await Tutor.findOne({ email });
        const existingStudent = await Student.findOne({ email });

        if (existingTutor || existingStudent) {
            return res.status(400).json({ 
                success: false, 
                message: "User with this email already exists!" 
            });
        }

        const hashedPassword = await hashPassword(password);
        const tutor = await Tutor.create({ 
            fullName, 
            email, 
            password: hashedPassword, 
            institution, 
            subjectsOffered, 
            experience: Number(experience) 
        });

        res.status(201).json({ 
            success: true, 
            message: "Tutor registered successfully", 
            tutor: {
                id: tutor._id,
                fullName: tutor.fullName,
                email: tutor.email,
                role: tutor.role
            }
        });
    } catch (error) {
        console.error("Error in registerTutor:", error);
        res.status(500).json({
            success: false,
            message: "Error registering tutor"
        });
    }
};

export const getTutorProfile = async (req, res) => {
    try {
        const tutorId = req.user.id;
        const tutor = await Tutor.findById(tutorId).select('-password');
        
        if (!tutor) {
            return res.status(404).json({
                success: false,
                message: "Tutor not found"
            });
        }

        res.status(200).json({
            success: true,
            tutor
        });
    } catch (error) {
        console.error("Error in getTutorProfile:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching tutor profile"
        });
    }
};

export const updateTutorProfile = async (req, res) => {
    try {
        const tutorId = req.user.id;
        let updateData = req.body;
        
        // Get the current tutor data to access old file paths
        const currentTutor = await Tutor.findById(tutorId);
        if (!currentTutor) {
            return res.status(404).json({
                success: false,
                message: "Tutor not found"
            });
        }

        // Handle files if they exist
        if (req.files) {
            // Handle profile image
            if (req.files.profileImage) {
                // Delete old profile image if it exists
                if (currentTutor.profileImageUrl) {
                    try {
                        const oldImagePath = path.join(__dirname, '..', currentTutor.profileImageUrl);
                        console.log('Deleting old profile image:', oldImagePath);
                        if (fs.existsSync(oldImagePath)) {
                            fs.unlinkSync(oldImagePath);
                            console.log('Successfully deleted old profile image');
                        }
                    } catch (error) {
                        console.error('Error deleting old profile image:', error);
                    }
                }
                updateData.profileImageUrl = `/uploads/profiles/${req.files.profileImage[0].filename}`;
            }

            // Handle CV file
            if (req.files.cvFile) {
                // Delete old CV if it exists
                if (currentTutor.cv) {
                    try {
                        const oldCVPath = path.join(__dirname, '..', currentTutor.cv);
                        console.log('Deleting old CV:', oldCVPath);
                        if (fs.existsSync(oldCVPath)) {
                            fs.unlinkSync(oldCVPath);
                            console.log('Successfully deleted old CV');
                        }
                    } catch (error) {
                        console.error('Error deleting old CV:', error);
                    }
                }
                updateData.cv = `/uploads/cvs/${req.files.cvFile[0].filename}`;
            }
        }

        // Parse JSON strings back to objects if they exist
        try {
            if (typeof updateData.availability === 'string') {
                updateData.availability = JSON.parse(updateData.availability);
            }
            if (typeof updateData.subjectsOffered === 'string') {
                updateData.subjectsOffered = JSON.parse(updateData.subjectsOffered);
            }
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            return res.status(400).json({
                success: false,
                message: 'Invalid data format for availability or subjects'
            });
        }

        // Validate subjectsOffered format
        if (updateData.subjectsOffered) {
            if (!Array.isArray(updateData.subjectsOffered)) {
                return res.status(400).json({
                    success: false,
                    message: 'subjectsOffered must be an array'
                });
            }

            // Ensure each subject has the correct format
            updateData.subjectsOffered = updateData.subjectsOffered.map(subject => ({
                subject: subject.subject || '',
                topic: subject.topic || ''
            }));
        }

        // Remove sensitive fields
        delete updateData.password;
        delete updateData.email;
        delete updateData.role;

        const tutor = await Tutor.findByIdAndUpdate(
            tutorId,
            { $set: updateData },
            { 
                new: true,
                runValidators: true 
            }
        ).select('-password');

        if (!tutor) {
            return res.status(404).json({
                success: false,
                message: "Tutor not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            tutor
        });
    } catch (error) {
        console.error("Error in updateTutorProfile:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Error updating tutor profile"
        });
    }
};



