const Marca = require('../models/marca')
const { request, response} = require('express')

// crear
const createMarca = async (req = request, 
    res = response) => {
    try{
        const nombre = req.body.nombre 
            ? req.body.nombre.toUpperCase()
            : ''
        const marcaDB = await Marca.findOne({nombre})
        
        if(marcaDB){
            return res.status(400).json({msg: 'Ya existe'})
        }
        const data = {
            nombre  
        }
        const marca = new Marca(data)
        console.log(marca)
        await marca.save()
        return res.status(201).json(marca)
    }catch(e){
        return res.status(500).json({
            msg: 'Error general ' + e
        })
    }
}

//listar todos
const getMarcas = async (req = request, 
    res = response) => {
        try{
            const { estado } = req.query
            const marcasDB = await Marca.find({estado})//select * from estados where estado=?
            return res.json(marcasDB)
        }catch(e){
            return res.status(500).json({
                msg: 'Error general ' + e
            })
        }
}


//Editar Marca
const updateMarcaByID = async (req = request, 
    res = response) => {
    try{
        const id = req.params.id
        const data = req.body
        console.log(data)
        console.log(id)
        data.fechaActualizacion = new Date()
        console.log(data)
        const marca = await Marca.findByIdAndUpdate(id, data, {new: true})
        return res.status(201).json(marca)
    }catch(e){
        return res.status(500).json({msj: e})
    }  
}

/**
 * Borra una marca por su ID
 */
const deleteMarcaByID = async (req = request, 
    res = response) => {
        try{
            const id = req.params.id
            const marcaBD = await Marca.findById(id)
            if(!marcaBD){
                return res.status(404).json({msj: 'No existe marca'})
            }
            await Marca.findByIdAndDelete(id)
            return res.status(204).json({})
        }catch(e){
            return res.status(500).json({msj: e})
        }
}


module.exports = {createMarca, getMarcas, deleteMarcaByID, updateMarcaByID }