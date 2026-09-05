import mongoose, { MongooseError } from 'mongoose';

const accountSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    status: {
        type: String,
        enum: {
            values: ['active', 'frozen', 'closed'],
            message: 'Status can be either active, frozen or closed'
        },
        default: 'active'
    },
    currency: {
        type: String,
        required: true,
        default: 'INR',
    }

}, { timestamps: true });

accountSchema.index({ user: 1, status: 1 });

const accountModel = mongoose.model('Account', accountSchema);
export default accountModel;