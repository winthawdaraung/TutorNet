import express from 'express';
import { addReview, getTutorReviews } from '../controllers/reviewsController.js';

const reviewsRouter = express.Router();

reviewsRouter.post('/add/', addReview);
reviewsRouter.get('/tutor/:tutorId', getTutorReviews);

export default reviewsRouter;