import dotenv from 'dotenv'
import express from "express"
import cors from 'cors'
import pool from '../src/config/db.js'
import userRoutes from '../src/routes/userRoutes.js'
import createUserTable from '../src/data/createUserTable.js'


dotenv.config()
const app = express()
const port = process.env.PORT || 5001

// miidlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use(userRoutes)

// Databse
createUserTable()

// Testing Connection Postgres
app.get("/", async (req, res) => {
  try{
    console.log("Start");
    const result = await pool.query("SELECT current_database()");
    // app.emit('atabase')
    console.log("result", result.rows);
    res.send(`The database name is : ${result.rows[0].current_database}`);
  }
  catch(error){
    console.log(error)
  }
});

// Server
app.listen(port, () => {
    console.log(`Server is running in http://localhost:${port}`)
})