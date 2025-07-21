import dotenv from "dotenv"
import express, { Express } from "express"
import mongoose from "mongoose"
import routes from "./routes/routes"
import cors from "cors"
import { connectDB } from './config/db';

dotenv.config()
const app: Express = express()
const port: string | number = process.env.PORT || 6000

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Routes
app.use(routes)

// Server And Database
const startServer = async () => {
  try {
    await connectDB(); // Conecta ao MongoDB
    console.log('Starting server...');
    app.listen(port, () => {
      console.log(`Server is running in http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', (error as Error).message);
  }
};

startServer();
