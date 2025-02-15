import express from "express";
import { registerTutor } from "../controllers/tutorsController.js";
import { getTutors } from "../controllers/tutorsController.js";


const tutorsRouter = express.Router();

tutorsRouter.post('/register', registerTutor);
tutorsRouter.get('/', getTutors);

export default tutorsRouter;