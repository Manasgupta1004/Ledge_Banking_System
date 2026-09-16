import express from "express";
import { registerUser, loginUser, logoutUser, getCurrentUser, getUserById } from "../controllers/userController.js";
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post('/logout', logoutUser)
router.get('/getCurrentUser', authMiddleware, getCurrentUser)
router.post('/getuser/:accontId', authMiddleware, getUserById)

export default router;