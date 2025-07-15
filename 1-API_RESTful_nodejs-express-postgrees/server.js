import dotenv from 'dotenv'
import express from "express"
import cors from 'cors'
import pool from './src/config/db.js'

// import userRoutes from ''

dotenv.config()
const app = express()
const port = process.env.PORT || 5001

// miidlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
// app.use(routes)

// Testing Connection Postgres
app.get("/", async (req, res) => {
  console.log("Start");
  const result = await pool.query("SELECT current_database()");
  console.log("result", result.rows);
  res.send(`The database name is : ${result.rows[0].current_database}`);
});



// Server
app.listen(port, () => {
    console.log(`Server is running in http://localhost:${port}`)
})