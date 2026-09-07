import express from 'express'
import userRoutes from './routes/userRoutes.js'
import cookieparser from 'cookie-parser'
import accountRoutes from './routes/accountRoutes.js'
import transactionRoutes from './routes/transactionRoutes.js'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cookieparser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use('/api/user', userRoutes)
app.use('/api/account', accountRoutes)
app.use('/api/transactions', transactionRoutes)


export default app