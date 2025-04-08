require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT

const cors = require('cors')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const routes = require('./routes')
app.use(routes)
app.use(cors())

const connectDB = require('./src/config/database.js')
connectDB(app)

app.on('Database', () => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
})
