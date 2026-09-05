import express from 'express'
import userRoutes from './routes/userRoutes.js'
import cookieparser from 'cookie-parser'
import accountRoutes from './routes/accountRoutes.js'
const app = express()

app.use(express.json())
app.use(cookieparser())

app.use('/api/user', userRoutes)
app.use('/api/account', accountRoutes)


export default app