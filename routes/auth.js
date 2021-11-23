/* 
  Rutas / Auth
  host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { createUser, loginUser, revalidateToken } = require('../controllers/auth')

router.post(
  '/new',
  [ // middlewares
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 o mas caracteres').isLength({min: 6})
  ], 
  createUser);

router.post(
  '/',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 o mas caracteres').isLength({min: 6}) 
  ], 
  loginUser);

router.get('/renew', revalidateToken);

module.exports = router;