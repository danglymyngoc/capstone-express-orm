import express from "express";
import { signIn, signUp } from "../controllers/authController.js";


const authRoutes = express.Router()

authRoutes.post('/sign-in', signIn)
authRoutes.post('/sign-up', signUp)


export default authRoutes