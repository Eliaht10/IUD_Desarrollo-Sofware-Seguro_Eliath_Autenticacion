const { Router } = require('express')
const { createMarca, getMarcas, updateMarcaByID, deleteMarcaByID } =
 require('../controllers/marca')
 const {validarJwt} = require('../middlewares/validarJwt')
 const {esAdministrador} = require('../middlewares/validarRol')

const router = Router()

// crear Marca
router.post('/', validarJwt, esAdministrador, createMarca)

// consultar todas las marcas
router.get('/', validarJwt,  getMarcas)

//Editar marca por Id
router.put('/:id', validarJwt, esAdministrador, updateMarcaByID)

//Elinar marca por ID
router.delete('/:id', validarJwt, esAdministrador, deleteMarcaByID)

module.exports = router;