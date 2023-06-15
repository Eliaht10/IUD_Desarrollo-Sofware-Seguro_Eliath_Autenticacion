const { Router } = require('express')
const {createTipoEquipo, getTipoEquipos, getTipoEquipoByID, updateTipoEquipoByID, deleteTipoEquipoByID } =
 require('../controllers/tipoEquipo')
 const {validarJwt} = require('../middlewares/validarJwt')
 const {esAdministrador} = require('../middlewares/validarRol')

const router = Router()

// Crear Equipos
router.post('/', validarJwt, esAdministrador, createTipoEquipo)

// Buscar Todos Los Equipos
router.get('/', validarJwt, getTipoEquipos)

//Buscar Todos Los Equipos por Id
router.get('/:id', validarJwt,  getTipoEquipoByID)

//Editar Los Tipos de Equipos Ya existentes
router.put('/:id', validarJwt, esAdministrador, updateTipoEquipoByID)

//Eliminar El tipo Equipo
router.delete('/:id', validarJwt, esAdministrador, deleteTipoEquipoByID)


module.exports = router;