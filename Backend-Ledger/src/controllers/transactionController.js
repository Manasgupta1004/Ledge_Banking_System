import transactionModel from "../models/transactionModel.js";
import accountModel from "../models/accountModel.js";
import mongoose from "mongoose";
import ledgerModel from "../models/ledgerModel.js";

export const createTransaction = async (req, res) => {

    // 1. valid request

    const { fromAccount, toAccount, amount, idempotencyKey } = req.body
    try {
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

        if (fromUserAccount.status !== 'active' || toUserAccount.status !== 'active') {
            return res.status(400).json({
                message: 'Both fromaccount and toaccount must be active to process transaction'
            })
        }

        // 4. drive sender balance from ledger

        const balance = await fromUserAccount.getBalance()
        if (balance < amount) {
            return res.status(400).json({
                message: `insufficient balancein fromAccount. current balance is ${balance}. request amount is ${amount}`
            })
        }

        // 5. create transaction pending
        let transaction
        try {
            const session = await mongoose.startSession()
            session.startTransaction()

            transaction = (await transactionModel.create([{
                fromAccount, toAccount, amount, idempotencyKey,
                status: 'pending'
            }], { session }))[0]
            await transaction.save({ session })

            const debiteLedgerEntry = await ledgerModel.create([{
                account: fromAccount,
                amount: amount,
                transaction: transaction._id,
                type: 'debit'
            }], { session })

            // await (() => {
            //     return new Promise((resolve) => setTimeout(resolve, 10 * 1000))
            // })

            const crediteLedgerEntry = await ledgerModel.create([{
                account: toAccount,
                amount: amount,
                transaction: transaction._id,
                type: 'credit'
            }], { session })

            const transaction = await transactionModel.findOneAndUpdate(
                { _id: transaction._id },
                { status: 'completed' },
                { session }
            )
            await session.commitTransaction()
            session.endSession()

            return res.json({success: true, crediteLedgerEntry, debiteLedgerEntry, transaction})

        } catch (error) {
            return res.status(400).json({ message: 'Transaction is pending due to some issue, please retry after some time' })
        }

        res.status(201).json({
            message: 'Transaction completed successfully',
            transaction: transaction
        })

    } catch (error) {
        console.log(error)
        return res.json({ message: error.message })
    }

}

export const createInitialFundsTransaction = async (req, res) => {
    console.log("🔥 INITIAL FUNDS CONTROLLER HIT");
    const { toAccount, amount, idempotencyKey } = req.body
    console.log("REQ BODY:", req.body)
    try {
        if (!toAccount || !amount || !idempotencyKey) {
            return res.status(400).json({
                message: 'toAccount, amout ot idemptencyKey are required'
            })
        }
        const toUserAccount = await accountModel.findOne({ _id: toAccount })

        if (!toUserAccount) {
            return res.status(400).json({ message: 'invalid toUserAccount' })
        }

        const fromUserAccount = await accountModel.findOne({ user: req.user._id })

        if (!fromUserAccount) {
            return res.status(400).json({ message: 'system user account not found' })
        }

        const session = await mongoose.startSession()
        session.startTransaction()

        const transaction = new transactionModel({
            fromAccount: fromUserAccount._id, toAccount, amount, idempotencyKey,
            status: 'pending'
        })
        await transaction.save({ session })

        const debitLedgerEntry = await ledgerModel.create([{
            account: fromUserAccount._id,
            amount: amount,
            transaction: transaction._id,
            type: 'debit'
        }], { session })

        const creditLedgerEntry = await ledgerModel.create([{
            account: toAccount,
            amount: amount,
            transaction: transaction._id,
            type: 'credit'
        }], { session })
        transaction.status = 'completed'
        await transaction.save({ session })

        await session.commitTransaction()
        session.endSession()
        res.status(201).json({
            message: 'Initial Funds Transaction completed successfully',
            transaction: transaction,
            creditLedgerEntry: creditLedgerEntry,
            debitLedgerEntry: debitLedgerEntry
        })
    } catch (error) {
        console.log(error)
        return res.json({ message: error.message })
    }
}