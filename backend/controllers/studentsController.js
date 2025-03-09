import Student from "../models/studentsModel.js";
import Tutor from "../models/tutorsModel.js";
import Requests from "../models/bookingModel.js"
import { hashPassword } from "../config/utils.js";
import cloudinary from "../config/cloudinary.js";
import { Readable } from 'stream';

export const registerStudent = (async (req, res) => {
    const { fullName, email, password, studentId, institution, year } = req.body;
    try {
        const existingStudent = await Student.findOne({ email });
        const existingTutor = await Tutor.findOne({ email });

        if (existingStudent || existingTutor) {
            return res.status(400).json({ message: "User with this email already exists!" });
        }
        const hashedPassword = await hashPassword(password);
        const student = await Student.create({ fullName, email, password: hashedPassword, studentId, institution, year });
        res.status(201).json({ success: true, message: "Student registered successfully", student });
    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }
});

export const getStudentProfile = async (req, res) => {
    try {
        const studentId = req.user.id;
        console.log('Fetching student profile for ID:', studentId);
        const student = await Student.findById(studentId).select('-password');

        if (!student) {
            return res.status(404).json({ 
                success: false,
                message: "Student not found" 
            });
        }

        res.status(200).json({ success: true, student });
    } catch (error) {    
        res.status(500).json({ success: false, message: error });
    }
}

export const updateStudentProfile = async (req, res) => {
    try {
        const studentId = req.user.id;
        const updateData = req.body;
        const currentStudent = await Student.findById(studentId);

        if (!currentStudent) {
            return res.status(404).json({ 
                success: false,
                message: "Student not found" 
            });
        }

        // Handle profile image upload to Cloudinary
        if (req.files && req.files.profileImage) {
            try {
                console.log('Starting profile image upload to Cloudinary...');
                
                // Log the file details
                const file = req.files.profileImage[0];
                console.log('File details:', {
                    fieldname: file.fieldname,
                    mimetype: file.mimetype,
                    size: file.size,
                    buffer: file.buffer ? 'Buffer present' : 'No buffer'
                });

                // Delete old image from Cloudinary if it exists
                if (currentStudent.profileImageUrl) {
                    try {
                        const publicId = currentStudent.profileImageUrl.split('/').pop().split('.')[0];
                        console.log('Deleting old image with public ID:', publicId);
                        await cloudinary.uploader.destroy(publicId);
                        console.log('Successfully deleted old image');
                    } catch (deleteError) {
                        console.error('Error deleting old image:', deleteError);
                        // Continue with upload even if delete fails
                    }
                }

                // Convert buffer to stream
                const stream = Readable.from(file.buffer);

                // Upload new image to Cloudinary
                const uploadResponse = await new Promise((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        {
                            folder: 'student-profiles',
                            transformation: [
                                { width: 500, height: 500, crop: 'fill' },
                                { quality: 'auto' }
                            ],
                            resource_type: 'auto' // Let Cloudinary detect the file type
                        },
                        (error, result) => {
                            if (error) {
                                console.error('Cloudinary upload error:', error);
                                reject(error);
                            } else {
                                console.log('Cloudinary upload success:', {
                                    url: result.secure_url,
                                    public_id: result.public_id
                                });
                                resolve(result);
                            }
                        }
                    );

                    // Handle stream errors
                    stream.on('error', (error) => {
                        console.error('Stream error:', error);
                        reject(error);
                    });

                    stream.pipe(uploadStream);
                });

                updateData.profileImageUrl = uploadResponse.secure_url;
                console.log('Profile image URL updated:', updateData.profileImageUrl);
            } catch (error) {
                console.error('Detailed error uploading to Cloudinary:', error);
                return res.status(500).json({
                    success: false,
                    message: "Error uploading image to Cloudinary: " + (error.message || 'Unknown error')
                });
            }
        }

        // Remove sensitive fields
        delete updateData.password;
        delete updateData.email;
        delete updateData.role;

        console.log('Updating student profile with data:', updateData);

        const updatedStudent = await Student.findByIdAndUpdate(
            studentId,
            { $set: updateData },
            { 
                new: true,
                runValidators: true 
            }
        ).select('-password');

        if (!updatedStudent) {
            return res.status(404).json({ 
                success: false,
                message: "Failed to update student profile" 
            });
        }

        console.log('Successfully updated student profile:', updatedStudent);
        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            student: updatedStudent
        });
    } catch (error) {
        console.error('Error in updateStudentProfile:', error);
        res.status(500).json({
            success: false,
            message: error.message || "Error updating profile"
        });
    }
};

export const sendRequest = async (req, res) => {
    try {
        const { studentId, tutorId, subject, message } = req.body;
        const student = await Student.findById(studentId);
        const tutor = await Tutor.findById(tutorId);

        if (!student || !tutor) {
            return res.status(404).json({ 
                success: false,
                message: "Student or tutor not found" 
            });
        }

        student.requests.push({ tutorId, subject, message });
        await student.save();
        res.status(200).json({ success: true, message: "Request sent successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error });
    }
}

export const getTutorProfile = async (req, res) => {
    try {
        const tutorId = req.params.id;
        console.log('Fetching tutor profile for ID:', tutorId);
        
        const tutor = await Tutor.findById(tutorId)
            .select('-password -resetPasswordToken -resetPasswordExpires')
            .lean();

        if (!tutor) {
            return res.status(404).json({
                success: false,
                message: "Tutor not found"
            });
        }

        // Format the response
        const formattedTutor = {
            id: tutor._id,
            fullName: tutor.fullName,
            email: tutor.email,
            institution: tutor.institution,
            profileImageUrl: tutor.profileImageUrl,
            qualification: tutor.qualification || '',
            experience: tutor.experience || 0,
            aboutMe: tutor.aboutMe || '',
            aboutMySession: tutor.aboutMySession || '',
            cvDownload: tutor.cv || '',
            rating: tutor.rating || 0,
            reviewsCount: tutor.reviews?.length || 0,
            availability: tutor.availability || {},
            subjectsOffered: tutor.subjectsOffered || [],
            reviews: tutor.reviews || [],
            contactEmail: tutor.contactEmail || tutor.email,
            contactNumber: tutor.contactNumber || ''
        };

        console.log('Sending formatted tutor data:', formattedTutor);

        res.status(200).json({
            success: true,
            tutor: formattedTutor
        });
    } catch (error) {
        console.error("Error in getTutorProfile:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching tutor profile"
        });
    }
};

export const createRequest = async (req, res) => {
    try {
        const studentId = req.user.id;
        const { tutorId, subject, message, fromTime, toTime, startDate } = req.body;
        console.log("StudentID:", studentId);
        console.log("TutorID:", tutorId);
        const student = await Student.findById(studentId);
        const tutor = await Tutor.findById(tutorId);

        if (!student || !tutor) {
            return res.status(404).json({ 
                success: false,
                message: "Student or tutor not found" 
            });
        }

        
        const request = await Requests.create({
            studentId,
            tutorId,
            subject,
            studentmessage: message, 
            fromTime,
            toTime,
            startDate,
            status: 'pending'
        });

       
        await Tutor.findByIdAndUpdate(
            tutorId, 
            { 
                $push: { 
                    requests: {
                        id: request._id,
                        studentId: student._id,
                        studentName: student.fullName,
                        studentText: message,
                        subject: subject,
                        time: fromTime + ' - ' + toTime,
                        date: startDate,
                        profileImageUrl: student.profileImageUrl
                    },
                    notifications:  { id: request._id }
                } 
            },{ new: true }
        );
        
        console.log("requestID", request._id);
        res.status(200).json({ success: true, message: "Request sent successfully", requestId: request._id });
    }
    catch (error) {
        console.error("Error creating request:", error);
        res.status(500).json({ success: false, message: error.message || "Server error" });
    }
};