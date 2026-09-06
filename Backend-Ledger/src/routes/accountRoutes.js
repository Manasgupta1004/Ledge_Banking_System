import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createAccount, getUserBalance, getUserAccounts } from "../controllers/accountController.js";



const router = express.Router();

router.post('/', authMiddleware, createAccount);
router.get('/get-accounts', authMiddleware, getUserAccounts)
router.get('/get-balance/:accountId', authMiddleware, getUserBalance)


export default router;