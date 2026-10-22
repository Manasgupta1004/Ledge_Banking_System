import 'dotenv/config'
import app from './src/app.js'
import connectDB from './src/configs/db.js'

await connectDB()

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('Server is Live....')
})

app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})