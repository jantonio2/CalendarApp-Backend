// npm i express
// npm install dotenv

const express = require('express');
require('dotenv').config();

// Creando el servidor express
const app = express();

// Directorio Público
app.use(express.static('public'));

// rutas
// app.get('/', function(req, res) {
//   res.json({
//     ok: true
//   });
// });

// Escuchando peticiones
app.listen(process.env.PORT, function() {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});