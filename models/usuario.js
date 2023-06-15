const {Schema, model} = require('mongoose')

const usuarioSchema = (items)=>{
    const schema = Schema({
        nombre: {
            type: String,
            required: [true, 'Nombre requerido']
        },
        email: {
            type: String,
            required: [true, 'Email requerido'],
            unique: true
        },
        estado: {
            type: Boolean,
            default: true,
            required: true
        },
        fechaCreacion: {
            type: Date,
            default: new Date()
        },
        fechaActualizacion: {
            type: Date,
            default: new Date()
        }

    })
    if (items) {
        schema.add(items)
    }
    return schema;

}
    


const UsuarioSchema = usuarioSchema();

const UsuarioAutenticarSchema = usuarioSchema({
    password:{
        type: String,
        required:true
    },
    rol:{
        type: String,
        required:true,
        enum:['ADMINISTRADOR','DOCENTE']
    }

})


module.exports = model('Usuario', UsuarioSchema)
module.exports = model('UsuarioAutenticar', UsuarioAutenticarSchema)