/* 
  Rutas / Event
  host + /api/events
*/

const { Router } = require('express');
const router = Router();
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { validarJWT } = require('../middlewares/validar-jwt');

router.use(validarJWT);

router.get('/', getEventos);

router.post('/', crearEvento);

router.put('/:id', actualizarEvento);

router.delete('/:id', eliminarEvento);

module.exports = router;