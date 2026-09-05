import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createAccount } from "../controllers/accountController.js";



const router = express.Router();

router.post('/', authMiddleware, createAccount);



export default router;