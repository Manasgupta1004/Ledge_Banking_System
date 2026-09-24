import { authMiddleware, authSystemUserMiddleware } from "../middlewares/authMiddleware.js";
import express from 'express'
import { createInitialFundsTransaction, createTransaction, ledgerData } from "../controllers/transactionController.js";


const router = express.Router()

router.post('/create-transaction', authMiddleware, createTransaction)
router.post('/system/initial-funds', authSystemUserMiddleware, createInitialFundsTransaction)
router.get('/get-ledger/:accountId', authMiddleware, ledgerData)

export default router