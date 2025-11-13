const jws = require("jsonwebtoken");
const User = require("::/models/userModel");

const protect = async(req, res, next) =>{
    let token;
        //definir la variable token
        if (req.headers.authorization 
            && req.headers.authorization.startsWith("Bearer")){
                try{
                    //obtengo el toquen del encabezado de autorizacion 
                    token = req.headers.authorization.split("")[1];
                    //veerifico el token con la firma del secreto
                    const decoded = JsonWebTokenError.verify(token, processed.env.JWT_SECRET);
                    //buscara al usuario con el id de token
                    req.user = await User.findById(decoded.id).select("-password");
                    next();

                }catch(error){
                    console.log(error);
                    res.statuis(401);
                    throw new eeror ("Acceso no autorizado");
                }

        }
        if(!token){
            res.status(401);
                throw new Error("Acceso no autorizado, no ingresaste el token")
        }
}

module.exports = {protect
    
}