const { Router } = require('express')
const {createUsuario, getUsuarios, updateUsuarioByID, deleteUsuarioByID} =
 require('../controllers/usuario')
 const {validarJwt} = require('../middlewares/validarJwt')
 const {esAdministrador} = require('../middlewares/validarRol')

const router = Router()

// crear
router.post('/', validarJwt, esAdministrador, createUsuario)

// consultar todos
router.get('/', validarJwt, getUsuarios)

//Editar Usuario
router.put('/:id', validarJwt, esAdministrador, updateUsuarioByID)

//Elinar usuario
router.delete('/:id', validarJwt, esAdministrador, deleteUsuarioByID)

module.exports = router;