import transactionModel from "../models/transactionModel.js";
import accountModel from "../models/accountModel.js";
import mongoose from "mongoose";
import ledgerModel from "../models/ledgerModel.js";

export const createTransaction = async (req, res) => {

    // 1. valid request

    const { fromAccount, toAccount, amount, idempotencyKey } = req.body

    if (!fromAccount || !toAccount || !amount || !idempotencyKey) {
        return res.status(400).json({
            message: 'fromAccount, toAccount, amout ot idempotencyKey are required'
        })
    }

    const fromUserAccount = await accountModel.findOne({ _id: fromAccount })
    const toUserAccount = await accountModel.findOne({ _id: toAccount })

    if (!fromUserAccount || !toUserAccount) {
        return res.status(400).json({ message: 'invalid fromAccount or toAccount' })
    }

    // 2. validate idempotency key

    const isTransactionAlreadyExisits = await transactionModel.findOne({
        idempotencyKey: idempotencyKey
    })
    if (isTransactionAlreadyExisits) {
        if (isTransactionAlreadyExisits.status === 'completed') {
            return res.status(200).json({
                message: 'transaction already processed',
                transaction: isTransactionAlreadyExisits
            })
        }
        if (isTransactionAlreadyExisits.status === 'pending') {
            return res.status(200).json({
                message: 'transaction is still proccessing please wait'
            })
        }
        if (isTransactionAlreadyExisits === 'failed') {
            return res.status(500).json({
                transaction: isTransactionAlreadyExisits,
                message: 'previous transaction attempt failed, please try again'
            })
        }
        if (isTransactionAlreadyExisits === 'reverse') {
            return res.status(500).json({
                message: 'transaction was reverse, please retry'
            })
        }
    }

    // 3. check account status

    if (fromUserAccount.status !== 'active' || toUserAccount !== 'active') {
        return res.status(400).json({
            message: 'Both fromaccount and toaccount must be active to process transaction'
        })
    }

    // 4. drive sender balance from ledger

    const balance = await fromUserAccount.getBalance()
    if (balance < amount) {
        res.json(400).json({
            message: `insufficient balancein fromAccount. current balance is ${balance}. request amount is ${amount}`
        })
    }

    // 5. create transaction pending
    const session = await mongoose.startSession()
    session.startTransaction()

    const transaction = await transactionModel.create({
        fromAccount, toAccount, amount, idempotencyKey,
        status: 'pending'
    }, { session })

    const debiteLedgerEntry = await ledgerModel.create({
        account: fromAccount,
        amount: amount,
        transaction: transaction._id,
        type: 'debite'
    }, { session })

    const creditLedgerEntry = await ledgerModel.create({
        account: toAccount,
        amount: amount,
        transaction: transaction._id,
        type: 'credite'
    }, { session })

    transaction.status = 'completed'
    await transaction.save({ session })

    await session.commitTransaction()
    session.endSession()
}