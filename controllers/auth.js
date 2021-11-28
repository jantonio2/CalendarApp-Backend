const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

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
    
    // Encriptando contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    // Generando JWT
    const token = await generarJWT(usuario.id, usuario.name);

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el admin'
    });
  }
};

const loginUser = async(req, res = response) => {

  const {email, password} = req.body;

  try {
    
    const usuario = await Usuario.findOne({email});

    if(!usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario no existe'
      });
    }

    // Confirmando passwords
    const validPassword = bcrypt.compareSync(password, usuario.password);

    if(!validPassword){
      return res.status(400).json({
        ok: false,
        msg: 'Password incorrecto'
      });
    }

    // Generando JWT
    const token = await generarJWT(usuario.id, usuario.name);    

    res.json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el admin'
    });
  }
};

const revalidateToken = async(req, res = response) => {
  
  const { uid, name } = req;

  const token = await generarJWT(uid, name); 

  res.json({
    ok: true,
    token
  });
};

module.exports = {
  createUser,
  loginUser,
  revalidateToken
};