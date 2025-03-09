import Tutor from "../models/tutorsModel.js";
import Student from "../models/studentsModel.js";
import { hashPassword } from "../config/utils.js";
//import fs from 'fs';
//import path from 'path';
//import { fileURLToPath } from 'url';
import cloudinary from "../config/cloudinary.js";
import { Readable } from 'stream';
import mongoose from "mongoose";
import { getStudentProfile } from "./studentsController.js";

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

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
        // const subjectsOffered_objects = subjectsOffered.map(subject => ({
        //     subject: subject || '',
        //     topic: ''
        // }));
        // console.log(subjectsOffered, subjectsOffered_objects);

        const hashedPassword = await hashPassword(password);
        const tutor = await Tutor.create({ 
            fullName, 
            email, 
            password: hashedPassword, 
            institution, 
            // subjectsOffered_objects, 
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
        console.log("UserID", tutorId);
        const tutor = await Tutor.findById(tutorId).select('-password');

        await Tutor.findById(tutorId).select('-password');
        
        if (!tutor) {
            return res.status(404).json({
                success: false,
                message: "Tutor not found"
            });
        }

        // Return the tutor profile
        // tutor.profileImageUrl = `${ENV.API_URL}${tutor.profileImageUrl}`;
        // tutor.cv = `${ENV.API_URL}${tutor.cv}`;
        // console.log("Tutor profile:", tutor);

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
            try {
                // Handle profile image
                if (req.files.profileImage) {
                    // Delete old profile image from Cloudinary if it exists
                    if (currentTutor.profileImageUrl) {
                        const publicId = currentTutor.profileImageUrl.split('/').pop().split('.')[0];
                        await cloudinary.uploader.destroy(publicId);
                    }

                    // Convert buffer to stream for profile image
                    const imageStream = Readable.from(req.files.profileImage[0].buffer);

                    // Upload new profile image to Cloudinary
                    const imageUploadResponse = await new Promise((resolve, reject) => {
                        const uploadStream = cloudinary.uploader.upload_stream(
                            {
                                folder: 'tutor-profiles',
                                transformation: [
                                    { width: 500, height: 500, crop: 'fill' },
                                    { quality: 'auto' }
                                ]
                            },
                            (error, result) => {
                                if (error) reject(error);
                                else resolve(result);
                            }
                        );

                        imageStream.pipe(uploadStream);
                    });

                    updateData.profileImageUrl = imageUploadResponse.secure_url;
                }

                // Handle CV file
                if (req.files.cvFile) {
                    // Delete old CV from Cloudinary if it exists
                    if (currentTutor.cv) {
                        const cvPublicId = currentTutor.cv.split('/').pop().split('.')[0];
                        await cloudinary.uploader.destroy(cvPublicId);
                    }

                    // Convert buffer to stream for CV
                    const cvStream = Readable.from(req.files.cvFile[0].buffer);

                    // Upload new CV to Cloudinary
                    const cvUploadResponse = await new Promise((resolve, reject) => {
                        const uploadStream = cloudinary.uploader.upload_stream(
                            {
                                folder: 'tutor-cvs',
                                format: 'jpg',
                                transformation: [
                                    { quality: 'auto' },
                                    { flags: 'preserve_transparency' }
                                ]
                            },
                            (error, result) => {
                                if (error) reject(error);
                                else resolve(result);
                            }
                        );

                        cvStream.pipe(uploadStream);
                    });

                    updateData.cv = cvUploadResponse.secure_url;
                }
            } catch (error) {
                console.error('Error uploading to Cloudinary:', error);
                return res.status(500).json({
                    success: false,
                    message: "Error uploading files to Cloudinary"
                });
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

        const updatedTutor = await Tutor.findByIdAndUpdate(
            tutorId,
            { $set: updateData },
            { 
                new: true,
                runValidators: true 
            }
        ).select('-password');

        if (!updatedTutor) {
            return res.status(404).json({
                success: false,
                message: "Failed to update tutor profile"
            });
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            tutor: updatedTutor
        });
    } catch (error) {
        console.error('Error in updateTutorProfile:', error);
        res.status(500).json({
            success: false,
            message: error.message || "Error updating profile"
        });
    }
};

//Search Tutor now using Tutor Name!

// export const searchTutors = async (req, res) => {
//     try {
//         const { subject, sortByRating } = req.query;
//         let query = {};

//         if (subject) {
//             query.subjects = { $regex: new RegExp(subject, "i") }; // Case-insensitive search
//         }

//         let tutors = await Tutor.find(query);

//         /*if (sortByRating === "true") {
//             tutors = tutors.sort((a, b) => b.rating - a.rating);
//         }*/

//         res.json(tutors);
//     } catch (error) {
//         res.status(500).json({ message: "Server Error", error });
//     }
// };

export const searchTutors = async (req, res) => {
    try {
        let { query, subject, sortByRating, price, experience, page=1, limit = 3 } = req.query;

        page = parseInt(page) || 1;
        limit = parseInt(limit) || 3;

        let searchQuery = {};

        // basic search by query text
        if (query) {
            searchQuery.$or = [
                { fullName: { $regex: new RegExp(query, "i") } },
                { "subjectsOffered.subject": { $regex: new RegExp(query, "i") } }
            ];
        }

        // silter by specific subject
        if (subject) {
            searchQuery["subjectsOffered.subject"] = { $regex: new RegExp(subject, "i") };
        }

        // silter by price range (in case)
        if (price) {
            const [min, max] = price.split('-').map(Number);
            if (!isNaN(min) && !isNaN(max)) {
                searchQuery.priceRate = { $gte: min, $lte: max };
            } else if (!isNaN(min)) {
                searchQuery.priceRate = { $gte: min };
            }
        }

        // silter by experience(in case)
        if (experience) {
            searchQuery.experience = { $gte: parseInt(experience) };
        }

         // sort by rating
        const sortOptions = sortByRating === "true" ?  { rating: -1 } : {};

        // fetch paginated tutors
        const tutors = await Tutor.find(searchQuery)
            .select('fullName subjectsOffered institution experience priceRate rating reviewsCount profileImageUrl')
            .sort(sortOptions) // sort by rating
            .skip((page - 1) * limit) // skip previous pages
            .limit(limit); // limit results per page

        const totalTutors = await Tutor.countDocuments(searchQuery); //get total count for pagination

       

        // Transform the data to match the frontend expectations
        const formattedTutors = tutors.map(tutor => ({
            id: tutor._id,
            name: tutor.fullName,
            subject: tutor.subjectsOffered.length > 0 
                ? tutor.subjectsOffered.map(s => s.subject).join(', ') 
                : 'No subjects listed',
            university: tutor.institution || 'Not specified',
            experience: tutor.experience ? `${tutor.experience} years` : 'Not specified',
            price: tutor.priceRate || 0,
            image: tutor.profileImageUrl || 'https://via.placeholder.com/150',
            rating: tutor.rating || 0,
            reviewsCount: tutor.reviewsCount || 0
        }));

        res.status(200).json({
            tutors: formattedTutors,
            totalPages: Math.ceil(totalTutors / limit),
            currentPage: page,
        });
    } catch (error) {
        console.error("Error in searchTutors:", error);
        res.status(500).json({ 
            message: "Server Error", 
            error: error.message 
        });
    }
};

export const getTutorDetails = async (req, res) => {
    try {
        const { id } = req.params;
        
        const tutor = await Tutor.findById(id)
            .select('-password -resetPasswordToken -resetPasswordExpires')
            .populate('reviews');

        if (!tutor) {
            return res.status(404).json({
                success: false,
                message: "Tutor not found"
            });
        }

        // Format the tutor data for the frontend
        const formattedTutor = {
            id: tutor._id,
            name: tutor.fullName,
            subjects: tutor.subjectsOffered || [],
            university: tutor.institution,
            experience: tutor.experience,
            price: tutor.priceRate || 0,
            image: tutor.profileImageUrl || 'https://via.placeholder.com/150',
            rating: tutor.rating || 0,
            reviewsCount: tutor.reviewsCount || 0,
            aboutMe: tutor.aboutMe || '',
            aboutMySession: tutor.aboutMySession || '',
            qualification: tutor.qualification || '',
            availability: tutor.availability || {},
            reviews: tutor.reviews || [],
            contactEmail: tutor.contactEmail || tutor.email || '',
            contactNumber: tutor.contactNumber || ''
        };

        res.status(200).json({
            success: true,
            tutor: formattedTutor
        });
    } catch (error) {
        console.error("Error in getTutorDetails:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching tutor details",
            error: error.message
        });
    }
};

export const declineStudentRequest = async (req, res) => {
    try {
        const { requestId } = req.params;
        const tutorId = req.user.id;

        console.log('Received requestId:', requestId);
        console.log('Received tutorId:', tutorId);

        if (typeof requestId !== 'string') {
            return res.status(400).json({
                success: false,
                message: "Request ID must be a valid string"
            });
        }

        if (!mongoose.Types.ObjectId.isValid(requestId)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid request ID' 
            });
        }

        const result = await Tutor.findOneAndUpdate(
            { _id: tutorId },
            { $pull: { requests: { id: requestId } } },
            { new: true }
        );

        // console.log('Update result:', result);

        if (!result) {
            return res.status(404).json({ 
                success: false, 
                message: 'Request not found or could not be removed' 
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Request declined and removed successfully',
            updatedRequests: result.requests
        });
    } catch (error) {
        console.error('Error declining request:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Server error',
            error: error.message 
        });
    }
};

export const acceptStudentRequest = async (req, res) => {
    try {
        const { requestId } = req.params;
        const formData = req.body;
        const tutorId = req.user.id;

        if (!mongoose.Types.ObjectId.isValid(requestId)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid request ID' 
            });
        }
      
        const studentId = formData.studentId;

        const student = await Student.findById(studentId).select('-password -resetPasswordToken -resetPasswordExpires');
        const tutor = await Tutor.findById(tutorId).select('-password -resetPasswordToken -resetPasswordExpires');
  
        if (!student || !tutor) {
            return res.status(404).json({ 
                success: false, 
                message: 'Student or tutor not found' 
            });
        }
  
        const updatedStudent = await Student.findByIdAndUpdate(
            studentId,
            {
                $push: {
                    notification: {
                        _id: new mongoose.Types.ObjectId(),
                        tutorId,
                        tutorName: tutor.fullName,
                        tutorImage: tutor.profileImageUrl,
                        message: formData.reply,
                        reply: formData.reply,
                        subject: formData.subject,
                        time: formData.time,
                        date: formData.date,
                        profileImageUrl: tutor.profileImageUrl || 'https://via.placeholder.com/150',
                        studyLink: formData.studyLink
                    }
                }
            },
            { new: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ 
                success: false, 
                message: 'Failed to update student with notification' 
            });
        }

        // Update the status of the specific request in the tutor's requests array
        const updatedTutor = await Tutor.findOneAndUpdate(
            { _id: tutorId, 'requests.id': requestId },
            { $set: { 'requests.$.status': 'accepted' } },
            { new: true }
        );

        if (!updatedTutor) {
            return res.status(404).json({ 
                success: false, 
                message: 'Failed to update tutor request status' 
            });
        }

        return res.status(200).json({ 
            success: true, 
            message: 'Request accepted successfully',
            updatedNotifications: updatedStudent.notifications
        });
  
    } catch (error) {
        console.error('Error accepting request:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Server error',
            error: error.message 
        });
    }
};
