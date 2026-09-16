import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import blackListModel from '../models/blackListModel.js'
import accountModel from '../models/accountModel.js'

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' })
        }
        const newUser = await userModel.create({ name, email, password })

        const generatedToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '30d' })

        res.cookie('token', generatedToken)

        return res.status(201).json({ success: true, message: 'User registered successfully', })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Server Error' })
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const alreadyUser = await userModel.findOne({ email }).select('+password')
        if (!alreadyUser) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }
        const isMatch = await bcrypt.compare(password, alreadyUser.password)
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }
        const generatedToken = jwt.sign({ id: alreadyUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '30d' })
        res.cookie('token', generatedToken)
        return res.status(200).json({ success: true, message: 'Login successful', })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Server Error' })
    }
}

export const logoutUser = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization

    if (!token) {
        return res.status(200).json({ success: true, message: 'user logged out successfully' })
    }
    res.cookie('token')
    await blackListModel.create({ token: token })
    return res.status(200).json({ success: true, message: 'User Logout Successfully' })
}

export const getCurrentUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id)

        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            user
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};

export const getUserById = async (req, res) => {
    try {
        const { accountId } = req.param

        const account = accountModel.findOne({ _id: accountId })
        const userId = account.user
        const user = userModel.fineOne({ _id: userId })
        return res.status(200).json({ success: true, user })

    } catch (error) {
        return res.json(error.mssage)
    }
}
