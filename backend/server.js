import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";
import studentsRouter from './router/studentsRouter.js';
import tutorsRouter from './router/tutorsRouter.js';
import userRouter from './router/userRouter.js';
import cors from 'cors';


dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// CORS configuration
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use('/api/students', studentsRouter);
app.use('/api/tutors', tutorsRouter);
app.use('/api/users', userRouter);


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false, 
        message: err.message || 'Internal server error' 
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    connectDB();
});

