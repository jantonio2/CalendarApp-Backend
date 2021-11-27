const {response} = require('express');
const Usuario = require('../models/Usuario');

const createUser = async(req, res = response) => {

  const {email, password} = req.body;

  try { 

    let usuario = await Usuario.findOne({email});

    if(usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe un usuario con ese correo'
      });
    }

    usuario = new Usuario(req.body);
  
    await usuario.save();
  
    console.log(usuario);

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el admin'
    })
  }
};

const loginUser = (req, res = response) => {

  const {email, password} = req.body;

  res.json({
    ok: true,
    msg: 'login',
    email,
    password
  });
};

const revalidateToken = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'renew'
  });
};

module.exports = {
  createUser,
  loginUser,
  revalidateToken
};