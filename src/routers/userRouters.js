import express from "express";
import * as userControllers from "../controllers/userControllers.js";
import { signUpMiddleware } from "../middlewares/userMiddlewares.js";

const router = express.Router();

router.post("/sign-up", signUpMiddleware, userControllers.signUp);

export default router;
