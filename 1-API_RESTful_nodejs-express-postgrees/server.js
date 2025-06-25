// const mongoose = require('mongoose')
// mongoose.connect(process.env.CONNECTION)
//     .then(() => {
//         console.log('Connected')
//         app.emit('DataBase')
//     })
//     .catch((e) => console.log(e))




require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3333;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexão com o PostgreSQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Verificar conexão
pool.connect()
    .then(() => {
        console.log('Connected to PostgreSQL');
        app.emit('DataBase');
    })
    .catch((err) => console.error('Connection error', err.stack));

// Rotas
const userRoutes = require('./route');
app.use('/users', userRoutes);

// Inicializar o servidor após a conexão com o banco
app.on('DataBase', () => {
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
        console.log(`http://localhost:${port}/users`);
    });
});

module.exports = pool; // Exportar o pool para usar em outros arquivos
