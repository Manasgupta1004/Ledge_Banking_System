import userModel from '../model/userModel.js'
import jwt from 'jsonwebtoken'


export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]

    if (!token) {
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
