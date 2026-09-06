import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import tokenBlackListModel from '../models/blackListModel.js'


export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    const isBlacklisted = await tokenBlackListModel.findOne({ token })
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const user = await userModel.findById(decoded.id)
        req.user = user
        return next()
    } catch (error) {
        console.error(error)
        return res.status(401).json({ message: 'Unauthorized' })
    }
}

export const authSystemUserMiddleware = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    const isBlacklisted = await tokenBlackListModel.findOne({ token })
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const user = await userModel.findById(decoded.id).select('+systemUser')
        console.log(user)
        if (!user.systemUser) {
            return res.status(403).json({
                message: 'forbidden access, not a system user'
            })
        }
        console.log('authmiddleware compeleted')
        req.user = user
        return next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: 'Unauthorized system user' })
    }
}