const { request, response} = require('express')


const esAdministrador = async(req= request, res= response, next)=> {
    const { rol } =req.user;
    
    if(!req.user ) {
        return res.status(500).json({
            msg: "Debe Validar Token",
        });
    }
    

    if (rol !== "ADMINISTRADOR") {
        return res.status(403).json({
            msg: "Acceso Denegado",
        });
    
    }
    next();
};

module.exports={esAdministrador}