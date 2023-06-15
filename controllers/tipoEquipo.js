const TipoEquipo = require('../models/tipoEquipo')
const { request, response} = require('express')
const estado = require('../models/estado')


//Crear Tipo Equipo
const createTipoEquipo = async (req = request,
    res = response) => {
    try{
        const nombre = req.body.nombre
            ? req.body.nombre.toUpperCase()
            : ''
        const tipoEquipoDB = await TipoEquipo.findOne({nombre})//select * from tipoEquipo where nombre=?
       
        if(tipoEquipoDB){
            return res.status(400).json({msg: 'Ya existe'})
        }
        const data = {
            nombre  // nombre: nombre
        }
        const tipoEquipo = new TipoEquipo(data)
        console.log(tipoEquipo)
        await tipoEquipo.save()
        return res.status(201).json(tipoEquipo)
    }catch(e){
        return res.status(500).json({
            msg: 'Error general ' + e
        })
    }
}


//Buscar TipoEquipo En General
const getTipoEquipos = async (req = request,
    res = response) => {
        try{
            const { estado } = req.query
            const tipoEquiposDB = await TipoEquipo.find({estado})//select * from tipoEquipo where estado=?
            return res.json(tipoEquiposDB)
        }catch(e){
            return res.status(500).json({
                msg: 'Error general ' + e
            })
        }
}

//Buscar TipoEquipo Por Id
const getTipoEquipoByID = async (req = request,
    res = response) => {
    try{
        console.log(req.params)
        const id = req.params.id
        const query = {_id: id}
        const tipoequipoDB = await TipoEquipo.findOne(query)
        return res.json(tipoequipoDB)
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: e})  
    }
}

//Editar TipoEquipos
const updateTipoEquipoByID = async (req = request,
    res = response) => {
    try{
        console.log(req.body)
        console.log(req.params)
        const data = req.body
        const id = req.params.id
        const tipoequipoDB = await TipoEquipo.findById(id)
        if(!tipoequipoDB){
            return res.json({msg: 'No existe el tipo equipo'})
        }
        data.fechaActualizacion = new Date()
        console.log(data)
        const tipoEquipo = await TipoEquipo.findByIdAndUpdate(id, data, {new: true})
        return res.json(tipoEquipo)
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: e})  
    }
}


//Eliminar TipoEquipos
const deleteTipoEquipoByID = async (req = request,
    res = response) => {
    try{
        console.log(req.params)
        const id = req.params.id
        const tipoequipoDB = await TipoEquipo.findById(id)
        if(!tipoequipoDB){
            return res.status(404).json({msg: 'No existe el tipo equipo'})
        }
        await TipoEquipo.findByIdAndDelete(id)
        return res.status(204).json({msg: 'TipoEquipo Borrado', id})
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: e}) 


    }
}




module.exports = {createTipoEquipo, getTipoEquipos, deleteTipoEquipoByID, updateTipoEquipoByID, getTipoEquipoByID }