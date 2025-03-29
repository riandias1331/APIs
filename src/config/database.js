const mongoose = require('mongoose')

const connectDB = (app, port) => {
    mongoose.connect(process.env.DATABASE_URL)
        .then(() => {
            console.log('Connected to database')
            app.emit('Database')
        })
        .catch((e) => console.log(e))
}

module.exports = connectDB
