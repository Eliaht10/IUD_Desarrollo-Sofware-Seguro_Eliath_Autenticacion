const UsuarioAutenticar = require("../models/usuario");
const {request, response}= require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

//REGISTRO DE uSUARIOS

const registrar = async(req = request, res = response)=> {
    const { email, password } = req.body;
    try{
        const usuarioAutenticarBD = await UsuarioAutenticar.findOne({email});
        if (usuarioAutenticarBD){
            return res.status(400).json({
                msg: "Usuario Existente"
            });
        }
        const usuarioAutenticar = new UsuarioAutenticar(req.body);
        const salt = await bcryptjs.genSalt();
        const passencrypted = await bcryptjs.hashSync(password, salt);
        usuarioAutenticar.password = passencrypted;
        const usuarioAutenticarSaved = await usuarioAutenticar.save();
        return res.status(201).json(usuarioAutenticarSaved);
        
    } catch(e) {
        console.log(e);
    }

};

// ACCESO DE USUARIOS

const accesos = async (req = request, res = response)=> {
    const { email, password}=req.body;
    try {
        const usuarioAutenticar = await UsuarioAutenticar.findOne({email});
        if (!usuarioAutenticar) {
            return res.status(404).json({
                msg: "Este Usuario No Existe"
            });
        }

        if (!usuarioAutenticar.estado) {
            return res.status(404).json({
                msg: " Este Usuario No Esta Activo"
            });
        }

        const isPassword = bcryptjs.compareSync(password, usuarioAutenticar.password);

        if (!isPassword) {
            return res.status(404).json({
                msg: "Usuario O contraseña Incorecta, Por favor Verifique"
            });
        }
    const payload={
        usuario: usuarioAutenticar.email,
        nombre: usuarioAutenticar.nombre,
        rol: usuarioAutenticar.rol,
    };

    const token = await jwt.sign(payload, process.env.SECRET_KEY,{
        expiresIn:"2h"
    });
    return res.json({
        usuarioAutenticar,
        token,
    });

    }catch(e) {
        console.log(e);
        return res.status(500).json({
            msg: e
        });
    }
};

module.exports ={registrar, accesos}