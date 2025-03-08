import express from "express";
import { registerStudent, sendRequest, getStudentProfile, updateStudentProfile, getTutorProfile } from "../controllers/studentsController.js";
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';
import { getTutorsBySubject } from "../controllers/tutorsController.js";

const studentsRouter = express.Router();

studentsRouter.post('/register', registerStudent);
studentsRouter.get('/profile', protect, getStudentProfile);
studentsRouter.put('/profile', protect, 
    upload.fields([
        { name: 'profileImage', maxCount: 1 }
    ]), 
    updateStudentProfile
);
studentsRouter.post('/send-request', protect, sendRequest);
studentsRouter.get('/search-tutors', protect, getTutorsBySubject);
studentsRouter.get('/tutor-profile/:id', protect, getTutorProfile);

export default studentsRouter;

