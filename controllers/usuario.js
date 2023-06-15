const Usuario = require('../models/usuario')
const { request, response} = require('express')

// crear Usuario
const createUsuario= async (req = request, 
    res = response) => {
    try{
        const data = req.body
        const email = data.email
        console.log(data)
        const usuarioBD = await Usuario.findOne({ email })
        if(usuarioBD){
            return res.status(400).json({msg: 'Ya existe usuario'})
        }
        const usuario = new Usuario(data)
        console.log(usuario)
        await usuario.save()
        return res.status(201).json(usuario)
    }catch(e){
        console.log(e)
        return res.status(500).json({e})
    }
}
//listar todos
const getUsuarios= async (req = request, 
    res = response) => {
        try{
            const { estado } = req.query
            const usuariosDB = await Usuario.find({estado})//select * from estados where estado=?
            return res.json(usuariosDB)
        }catch(e){
            return res.status(500).json({
                msg: 'Error general ' + e
            })
        }
}

//Editar Usuario
const updateUsuarioByID = async (req = request, 
    res = response) => {
    try{
        const id = req.params.id
        const data = req.body
        console.log(data)
        console.log(id)
        data.fechaActualizacion = new Date()
        console.log(data)
        const usuario = await Usuario.findByIdAndUpdate(id, data, {new: true})
        return res.status(201).json(usuario)
    }catch(e){
        return res.status(500).json({msj: e})
    }  
}


//Eliminar usuario 
 const deleteUsuarioByID = async (req = request, 
    res = response) => {
    try{
        const id = req.params.id
        const usuarioBD = await Usuario.findById(id)
        if(!usuarioBD){
            return res.status(404).json({msj: 'No existe usuario'})
        }
        await Usuario.findByIdAndDelete(id)
        return res.status(204).json({msj: 'Borrado '})
    }catch(e){
        return res.status(500).json({msj: e})
    }
}


module.exports = {createUsuario, getUsuarios, deleteUsuarioByID, updateUsuarioByID }