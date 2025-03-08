import Tutor from "../models/tutorsModel.js";
import Student from "../models/studentsModel.js";
import { hashPassword } from "../config/utils.js";
import cloudinary from "../config/cloudinary.js";
import { Readable } from 'stream';


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
        const tutorId = req.user.id ;
        console.log("UserID", tutorId);
        const tutor = await Tutor.findById(tutorId).select('-password');
        
        await Tutor.findById(tutorId).select('-password');

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
        const { query, subject, sortByRating, price, experience } = req.query;
        let searchQuery = {};

        // Basic search by query text (will search in name or subject)
        if (query) {
            searchQuery.$or = [
                { fullName: { $regex: new RegExp(query, "i") } },
                { "subjectsOffered.subject": { $regex: new RegExp(query, "i") } }
            ];
        }

        // Filter by specific subject
        if (subject) {
            searchQuery["subjectsOffered.subject"] = { $regex: new RegExp(subject, "i") };
        }

        // Filter by price range if provided
        if (price) {
            const [min, max] = price.split('-').map(Number);
            if (!isNaN(min) && !isNaN(max)) {
                searchQuery.priceRate = { $gte: min, $lte: max };
            } else if (!isNaN(min)) {
                searchQuery.priceRate = { $gte: min };
            }
        }

        // Filter by experience
        if (experience) {
            searchQuery.experience = { $gte: parseInt(experience) };
        }

        // Execute the query
        let tutors = await Tutor.find(searchQuery)
            .select('fullName subjectsOffered institution experience priceRate rating reviewsCount profileImageUrl');

        // Sort by rating if requested
        if (sortByRating === "true") {
            tutors = tutors.sort((a, b) => b.rating - a.rating);
        }

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

        res.status(200).json(formattedTutors);
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


