import express from "express";
import { registerTutor, getTutorProfile, updateTutorProfile,searchTutors, getTutorDetails } from "../controllers/tutorsController.js";
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const tutorsRouter = express.Router();

tutorsRouter.post('/register', registerTutor);
tutorsRouter.get('/profile', protect, getTutorProfile);
tutorsRouter.put('/profile', protect, 
    upload.fields([
        { name: 'profileImage', maxCount: 1 },
        { name: 'cvFile', maxCount: 1 }
    ]), 
    updateTutorProfile
);

//Search
tutorsRouter.get('/search',searchTutors)

//GetID
tutorsRouter.get('/:id', getTutorDetails);

export default tutorsRouter;