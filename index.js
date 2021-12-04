// npm i express
// npm install dotenv
// npm install express-validator
// npm i bcryptjs
// npm i jsonwebtoken
// npm install cors
// heroku logs -n 1000 --tail

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Creando el servidor express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors());

// Directorio Público
app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json());

// rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));


// Escuchando peticiones
app.listen(process.env.PORT, function() {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});