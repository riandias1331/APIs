import dotenv from "dotenv"
import express, { Express } from "express"
import mongoose from "mongoose"
import routes from "./routes"
import cors from "cors"

dotenv.config()
const app: Express = express()
const port: string | number = process.env.PORT || 6000

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Routes
app.use(routes)

// Database
mongoose.connect(process.env.DATABASE_URL as string)
    .then(() => {
        console.log('Database is Connect')
        app.emit("DataBase")
    })
    .catch((error) => {
        console.log(error)
    })

// Server
app.on("DataBase", () => {
    app.listen(port, () => {
        console.log(`Server is running in http://localhost:${port}`)
    })
})
