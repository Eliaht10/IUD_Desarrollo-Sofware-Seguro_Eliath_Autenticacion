const express = require('express')
const app = express()
const cors = require('cors')


app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors({
    origin: '*'
}))

const tipoEquipo = require('./routes/tipoEquipo')
const estado = require('./routes/estado')
const usuario = require('./routes/usuario')
const marca = require('./routes/marca')
const inventario = require('./routes/inventario')
const autenticar = require('./routes/autenticar')

// middlewares
app.use('/api/tiposequipos', tipoEquipo)
app.use('/api/estados', estado)
app.use('/api/usuarios', usuario)
app.use('/api/marcas', marca)
app.use('/api/inventarios', inventario)
app.use('/api/autenticar', autenticar)

app.get("*", (req, res)=> {
    return res.status(404).json({
        mej: "No se esncontro este pagina",
    });
});


module.exports = app