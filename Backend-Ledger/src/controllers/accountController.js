import { get } from 'mongoose'
import accountModel from '../models/accountModel.js'

export const createAccount = async (req, res) => {
    const user = req.user
    const account = await accountModel.create({ user: user._id })
    res.status(201).json({ account })
}

export const getUserAccounts = async (req, res) => {
    try {
        const account = await accountModel.find({ user: req.user._id })
        return res.status(200).json({ account })
    } catch (error) {
        return res.json({ message: error.message })
    }
}

export const getUserBalance = async (req, res) => {
    const { accountId } = req.params

    const account = await accountModel.findOne({ _id: accountId, user: req.user._id })

    if(!account){
        return res.status(404).json({message: 'account not found'})
    }
    const balance = await account.getBalance()
    return res.status(200).json({accountId: account._id, balance: balance})
}