import express from "express";
import { registerUser, loginUser, logoutUser, getCurrentUser } from "../controllers/userController.js";
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post('/logout', logoutUser)
router.get('/getCurrentUser', authMiddleware, getCurrentUser)

export default router;