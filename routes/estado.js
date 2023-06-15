const { Router } = require('express')
const {createEstado, getEstados, updateEstadoByID, deleteEstadoByID } =
 require('../controllers/estado')
 const {validarJwt} = require('../middlewares/validarJwt')
 const {esAdministrador} = require('../middlewares/validarRol')

const router = Router()

// crear
router.post('/',  createEstado)

// consultar todos
router.get('/',  validarJwt,esAdministrador, getEstados)

//Editar por ID
router.put('/:id', validarJwt, esAdministrador, updateEstadoByID)

//Eliminar Por ID
router.delete('/:id', validarJwt, esAdministrador, deleteEstadoByID)

module.exports = router;