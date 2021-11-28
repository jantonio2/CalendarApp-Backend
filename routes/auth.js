/* 
  Rutas / Auth
  host + /api/auth
*/

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { createUser, loginUser, revalidateToken } = require('../controllers/auth')
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

router.post(
  '/new',
  [ // middlewares
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 o mas caracteres').isLength({min: 6}),
    validarCampos
  ], 
  createUser);

router.post(
  '/',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 o mas caracteres').isLength({min: 6}),
    validarCampos 
  ], 
  loginUser);

router.get('/renew', validarJWT, revalidateToken);

module.exports = router;