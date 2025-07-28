require('dotenv').config()
const express = require('express')
const port = process.env.PORT
const routes = require('./routes')
const cors = require('cors')
const connectDB = require('./src/config/database.js')
const errHandler = require('./src/middleware/errorhandler.js')

const app = express()
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))


// Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Routes
app.use(routes)

// Error Handler
app.use(errHandler)

// Database
connectDB(app)

// Server
app.on('Database', () => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
})
