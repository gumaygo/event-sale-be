import express from "express";
const router = express.Router();
import authController from "../controllers/auth.controller.ts";
import authMiddleware from "../middlewares/auth.middleware.ts";
router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.get("/auth/me",authMiddleware, authController.me);
export default router;