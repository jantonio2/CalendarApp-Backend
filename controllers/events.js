const { response } = require('express');
const Evento = require('../models/Evento');

const getEventos = async(req, res = response) => {

  const eventos = await Evento.find()
                              .populate('user', 'name'); 

  res.json({
    ok: true,
    eventos
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

const actualizarEvento = async(req, res = response) => {

  try {
    const eventoId = req.params.id;
    const evento = await Evento.findById(eventoId);
    const uid = req.uid;

    if(!evento){
      return  res.status(404).json({
        ok: false,
        msg: 'No existe un evento con ese id'
      });
    }

    if(evento.user.toString() !== uid){
      return res.status(401).json({
        ok: false,
        msg: 'No tiene privilegio de editar este evento'
      });
    }

    const nuevoEvento = {
      ...req.body,
      user: uid
    };

    const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });

    res.json({
      ok: true,
      evento: eventoActualizado
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Pongase en contacto con el administrador'
    });
  }
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