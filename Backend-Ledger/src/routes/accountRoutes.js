import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createAccount, getUserBalance, getUserAccounts, deleteAccount, generateQR } from "../controllers/accountController.js";



const router = express.Router();

router.post('/create-account', authMiddleware, createAccount);
router.get('/get-accounts', authMiddleware, getUserAccounts)
router.get('/get-balance/:accountId', authMiddleware, getUserBalance)
router.post('/delete/:accountId', authMiddleware, deleteAccount)
router.post('/QR/:accountId', authMiddleware, generateQR)



export default router;