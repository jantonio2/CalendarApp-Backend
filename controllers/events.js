const { response } = require('express');
const Evento = require('../models/Evento');

const getEventos = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'getEventos'
  });
};

const crearEvento = async(req, res = response) => {

  
  try {
    const evento = new Evento(req.body);
    
    evento.user = req.uid;
    
    await evento.save();

    res.json({
      ok: true,
      evento
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Pongase en contacto con el administrador'
    });
  }
};

const actualizarEvento = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'actualizarEvento'
  });
};

const eliminarEvento = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'eliminarEvento'
  });
};

module.exports = {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento
};