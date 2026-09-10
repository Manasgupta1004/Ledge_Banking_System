import mongoose from 'mongoose'

const qrSchema = mongoose.Schema({

    accountId: {
       type: String,
       require: true
    },
    qrImageURL:{
        type: String,
        require: true
    }
})

const QRModel = mongoose.model('QRCode', qrSchema)

export default QRModel