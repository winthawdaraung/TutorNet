import express from "express";
import { registerTutor } from "../controllers/tutorsController.js";

const tutorsRouter = express.Router();

tutorsRouter.post('/register', registerTutor);

export default tutorsRouter;