import Tutor from "../models/tutorsModel.js";
import Student from "../models/studentsModel.js";
import { hashPassword } from "../config/utils.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from "mongoose";

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

        const subjectsOffered_objects = subjectsOffered.map(subject => ({
            subject: subject.subject || '',
            topic: subject.topic || ''
        }));

        const hashedPassword = await hashPassword(password);
        const tutor = await Tutor.create({ 
            fullName, 
            email, 
            password: hashedPassword, 
            institution, 
            subjectsOffered_objects, 
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
        console.log("Tutor profile:", tutor);
        
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

//For Searching Tutors
// export const searchTutors = async (req, res) => {
//     try {
//         const searchQuery = req.query.q || ""; // Get the search query from the frontend
//         const tutors = await Tutor.find({
//             fullName: {$regex: searchQuery, $options: "i"} //case insensitive
//         });
//         // const {subject, /*location, days,*/ institution} = req.query;
//         // //const {fullName} = req.query;
//         // let query = {};

//         // //if (fullName) query.name = { $regex: fullName, $options: "i" }; // Case-insensitive search//
//         // if (subject) query.subjects = { $regex: subject, $options: "i" }; // Subject search
//         // if (institution) query.institution = {$regex: institution, $options: "i"};
//         // //if (location) query.location = { $regex: location, $options: "i" }; Location search
//         // //if (days) query["availability.days"] = { $in: days.split(",") }; Available days
//         // //if (minRating) query.rating = { $gte: parseFloat(minRating) }; // Minimum rating filter//

//         // const tutors = await Tutor.find(query);
//         // Check if no tutors match the search criteria
//         if (tutors.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: "No tutors found matching the search criteria"
//             });
//         }

//         res.status(200).json({
//             success: true,
//             data: tutors
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Server error" });
//     }
// };

// export const searchTutors = async (req, res) => {
//     try {
//         const { query = "", page = 1, limit = 3 } = req.query; // Get query, page, and limit from the frontend
//         const skip = (page - 1) * limit; // Pagination logic (skip)
//         const totalTutors = await Tutor.countDocuments({ fullName: { $regex: query, $options: "i" } }); // Count total matching tutors

//         const tutors = await Tutor.find({
//             fullName: { $regex: query, $options: "i" } // case-insensitive search
//         })
//         .skip(skip)
//         .limit(Number(limit)); // Limit the number of results based on the frontend's request

//         if (tutors.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: "No tutors found matching the search criteria"
//             });
//         }

//         const totalPages = Math.ceil(totalTutors / limit); // Calculate total pages

//         res.status(200).json({
//             success: true,
//             data: tutors,
//             totalPages,
//             currentPage: Number(page),
//         });
//     } catch (error) {
//         console.error("Error in searchTutors:", error);
//         res.status(500).json({ success: false, message: "Server error" });
//     }
// };

