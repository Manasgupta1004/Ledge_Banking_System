import mongoose from "mongoose";


const ledgerSchema = new mongoose.Schema({
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: [true, 'Account is required'],
        index: true,
        immutable: true
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required'],
        min: [0, 'Amount must be a positive number'],
        immutable: true
    },
    transaction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
        required: [true, 'Transaction is required'],
        index: true,
        immutable: true
    },
    type: {
        type: String,
        enum: {
            values: ['credit', 'debit'],
            message: 'Invalid transaction type'
        },
        required: [true, 'Transaction type is required'],
        immutable: true
    }
}, {
    timestamps: true
})

function preventLedgerModification() {
    throw new Error('ledger entries are immutable and cannot be modified or deleted')
}

ledgerSchema.pre('findOneAndUpdate', preventLedgerModification)
ledgerSchema.pre('deleteOne', preventLedgerModification)
ledgerSchema.pre('updateOne', preventLedgerModification)
ledgerSchema.pre('remove', preventLedgerModification)
ledgerSchema.pre('deleteMany', preventLedgerModification)
ledgerSchema.pre('findOneAndDelete', preventLedgerModification)
ledgerSchema.pre('updateMany', preventLedgerModification)
ledgerSchema.pre('findOneAndReplace', preventLedgerModification)

const ledgerModel = mongoose.model('Ledger', ledgerSchema)
export default ledgerModel