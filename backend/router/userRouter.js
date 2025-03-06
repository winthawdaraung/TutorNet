import express from "express";
import { login, logout, forgotPassword, resetPassword} from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.post('/login', login);
userRouter.post('/logout', logout);
userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/reset-password', resetPassword);


export default userRouter;
