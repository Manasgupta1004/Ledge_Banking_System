import userModel from '../model/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

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

        return res.status(201).json({ message: 'User registered successfully', user: newUser, token: generatedToken })
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
        return res.status(200).json({ message: 'Login successful', user: alreadyUser, token: generatedToken })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Server Error' })
    }
}