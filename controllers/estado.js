const Estado = require('../models/estado')
const { request, response} = require('express')

// crear
const createEstado= async (req = request, 
    res = response) => {
    try{
        const nombre = req.body.nombre 
            ? req.body.nombre.toUpperCase()
            : ''
        const estadoDB = await Estado.findOne({nombre})//select * from tipoEquipo where nombre=?
        
        if(estadoDB){
            return res.status(400).json({msg: 'Ya existe'})
        }
        const data = {
            nombre  // nombre: nombre
        }
        const estado = new Estado(data)
        console.log(estado)
        await estado.save()
        return res.status(201).json(estado)
    }catch(e){
        return res.status(500).json({
            msg: 'Error general ' + e
        })
    }
}

//listar todos
const getEstados = async (req = request, 
    res = response) => {
        try{
            const { estado } = req.query
            const estadosDB = await Estado.find({estado})
            return res.json(estadosDB)
        }catch(e){
            return res.status(500).json({
                msg: 'Error general ' + e
            })
        }
}
//Editar
const updateEstadoByID = async (req = request,
    res = response) => {
        try{
            console.log(req.body)
            console.log(req.params)
            const data = req.body
            const id = req.params.id
            data.fechaActualizacion = new Date()
            const estado = await Estado.findByIdAndUpdate(id, data, {new: true})
            return res.json(estado)
        }catch(e){
            console.log(e)
            return res.status(500).json({msg: e})  
        }
}
//Eliminar
const deleteEstadoByID = async (req = request,
    res = response) => {
    try{
        console.log(req.params)
        const id = req.params.id
        const estadoDB = await Estado.findById(id)
        if(!estadoDB){
            return res.status(404).json({msg: 'No existe el estado'})
        }
        await Estado.findByIdAndDelete(id)
        return res.status(204).json({msg: 'Borrado', id})
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: e})  
    }
}


module.exports = {createEstado, getEstados, updateEstadoByID, deleteEstadoByID}
