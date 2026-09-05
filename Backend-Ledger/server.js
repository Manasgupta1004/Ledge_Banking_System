import 'dotenv/config'
import app from './src/app.js'
import connectDB from './src/configs/db.js'

await connectDB()


app.get('/', (req, res) => {
    res.send('Server is Live....')
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})