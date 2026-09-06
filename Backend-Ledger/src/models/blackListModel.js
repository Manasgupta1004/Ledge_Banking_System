import mongoose from "mongoose";


const TokenBlackListSchema = mongoose.Schema({
    token: {
        type: String,
        require: true,
        unique: true
    }

}, { timestamps: true })

TokenBlackListSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 3 })

const blackListModel = mongoose.model('BlackList', TokenBlackListSchema)

export default blackListModel