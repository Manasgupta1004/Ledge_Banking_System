import { authMiddleware } from "../middlewares/authMiddleware.js";
import express from 'express'
import { createTransaction } from "../controllers/transactionController.js";


const router = express.Router()


router.post('/', authMiddleware, createTransaction)

export default router