import express from 'express';
const app = express();
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";
import studentsRouter from './router/studentsRouter.js';
import tutorsRouter from './router/tutorsRouter.js';
import userRouter from './router/userRouter.js';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/api/students', studentsRouter);
app.use('/api/tutors', tutorsRouter);
app.use('/api', userRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  connectDB();
});

