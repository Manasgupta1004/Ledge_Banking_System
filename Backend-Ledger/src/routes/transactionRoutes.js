import { authMiddleware, authSystemUserMiddleware } from "../middlewares/authMiddleware.js";
import express from 'express'
import { createInitialFundsTransaction, createTransaction } from "../controllers/transactionController.js";


const router = express.Router()


router.post('/', authMiddleware, createTransaction)
router.post('/system/initial-funds', authSystemUserMiddleware, createInitialFundsTransaction)
export default router