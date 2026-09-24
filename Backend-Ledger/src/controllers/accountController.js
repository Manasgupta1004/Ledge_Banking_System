import { get } from 'mongoose'
import accountModel from '../models/accountModel.js'
import QRCode from 'qrcode'
import QRModel from '../models/QRCodeModel.js'
import userModel from '../models/userModel.js'

export const createAccount = async (req, res) => {
    try {
        const user = req.user
        const account = await accountModel.create({ user: user._id })

        return res.status(201).json({ success: true, account })
    } catch (error) {
        console.log("CREATE ACCOUNT ERROR:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getUserAccounts = async (req, res) => {
    try {
        const account = await accountModel.find({ user: req.user._id })

        return res.status(200).json({ success: true, account: account })

    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

export const getUserBalance = async (req, res) => {
    const { accountId } = req.params

    const account = await accountModel.findOne({ _id: accountId, user: req.user._id })

    if (!account) {
        return res.status(404).json({ message: 'account not found' })
    }
    const balance = await account.getBalance()
    return res.status(200).json({ accountId: account._id, success: true, balance: balance })
}

export const deleteAccount = async (req, res) => {
    const { accountId } = req.params
    const account = await accountModel.deleteOne({ _id: accountId, user: req.user.id })
    if (!account) {
        return res.status(404).json({ message: 'account not found' })
    }
    return res.status(200).json({ success: true, message: 'Account Deleted' })
}

export const generateQR = async (req, res) => {
    try {
        const { accountId } = req.params

        const qrData = JSON.stringify({
            type: "ledgerx-account",
            accountId: accountId.toString()
        })
        console.log(qrData)
        const qrCode = await QRCode.toDataURL(qrData)
        const alreadyQR = await QRModel.findOne({ accountId: accountId })
        if (alreadyQR) {
            return res.status(200).json({ success: true, QRmodel: alreadyQR })
        }
        const qrModel = await QRModel.create({
            accountId: accountId,
            qrImageURL: qrCode
        })

        return res.status(201).json({ success: true, QRmodel: qrModel })

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export const getUserById = async (req, res) => {
    try {
        const { accountId } = req.params

        const findAccount = await accountModel.findOne({ _id: accountId })

        if (!findAccount) {
            return res.json({
                success: false,
                message: 'Account not found'
            })
        }

        const findUser = await userModel.findOne({ _id: findAccount.user })

        if (!findUser) {
            return res.json({
                success: false,
                message: 'User not found'
            })
        }

        return res.json({
            success: true,
            userName: findUser.name
        })

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}