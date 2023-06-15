const { Router } = require('express')
const {accesos, registrar} = require('../controllers/autenticar')

const router = Router()



//Registrar Usuarios

router.post('/resgistro', registrar)

//Accesos

router.post('/acceso', accesos )

module.exports = router;