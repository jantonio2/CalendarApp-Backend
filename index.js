// npm i express
// npm install dotenv
// npm install express-validator
// npm i bcryptjs

const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();

// Creando el servidor express
const app = express();

// Base de datos
dbConnection();

// Directorio Público
app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json());

// rutas
app.use('/api/auth', require('./routes/auth'));
// TODO: CRUD: Eventos

// Escuchando peticiones
app.listen(process.env.PORT, function() {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});