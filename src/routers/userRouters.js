import express from "express";
import * as userControllers from "../controllers/userControllers.js";
import {
  signUpMiddleware,
  loginMiddleware,
  getUserMiddleware,
} from "../middlewares/userMiddlewares.js";

const router = express.Router();

router.post("/sign-up", signUpMiddleware, userControllers.signUp);
router.post("/login", loginMiddleware, userControllers.login);
router.get("/user", getUserMiddleware, userControllers.getUser);

export default router;
