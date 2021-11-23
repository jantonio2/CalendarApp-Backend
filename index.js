// npm i express
// npm install dotenv
// npm install express-validator

const express = require('express');
require('dotenv').config();

// Creando el servidor express
const app = express();

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