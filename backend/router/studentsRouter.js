import express from "express";
import { registerStudent } from "../controllers/studentsController.js";

const studentsRouter = express.Router();

studentsRouter.post('/register', registerStudent);


export default studentsRouter;

