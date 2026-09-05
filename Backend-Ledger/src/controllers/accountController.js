import accountModel from '../models/accountModel.js'

export const createAccount = async (req, res) => {
    const user = req.user
    const account = await accountModel.create({ user: user._id })
    res.status(201).json({ account })
}