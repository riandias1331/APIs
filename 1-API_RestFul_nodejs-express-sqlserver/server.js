// require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3333

const sql = require('mssql');
const dbConfig = {
    user: 'RIANDIAS\Rian',
    password: 'galoucura',
    server: 'localhost',
    database: 'TestDB',
    options: {
        encrypt: true,
        enableArithAbort: true
    }
};

sql.connect(dbConfig, (err) => {
    if (err) console.log(err);
    else console.log('Conectado ao SQL Server');
});

app.get('/users', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Users`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});
app.post('/users', async (req, res) => {
    const { Name, Email } = req.body;
    try {
        await sql.query`INSERT INTO Users (Name, Email) VALUES (${Name}, ${Email})`;
        res.status(201).send('User created');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(port, () => {
    console.log('Server is Running')
})