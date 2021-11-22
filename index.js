const express = require('express');
const app = express();

app.get('/', function(req, res) {
  res.json({
    ok: true
  });
});

app.listen(4000, function() {
  console.log(`Servidor corriendo en puerto ${4000}`);
});