import express from "express";
import { registerStudent, sendRequest } from "../controllers/studentsController.js";

const studentsRouter = express.Router();

studentsRouter.post('/register', registerStudent);
studentsRouter.post('/sendRequest', sendRequest);


export default studentsRouter;

