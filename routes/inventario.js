const { Router } = require('express')
const { createInventario, getInventarios, updateInventarioByID, deleteInventarioByID} =
 require('../controllers/inventario')
 const {validarJwt} = require('../middlewares/validarJwt')
 const {esAdministrador} = require('../middlewares/validarRol')

const router = Router()

// crear
router.post('/', validarJwt, esAdministrador, createInventario)

// consultar todos
router.get('/', validarJwt, getInventarios)

//Editar Inventario
router.put('/:id', validarJwt, esAdministrador, updateInventarioByID)

//Eliminar Inventario
router.delete('/:id', validarJwt, esAdministrador, deleteInventarioByID)

module.exports = router;