const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // obtengo el token del encabezado de autorizacion
            token = req.headers.authorization.split(' ')[1];
            // verifico el token con la firma del secreto
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // buscara al usuario con el id de token
            req.user = await User.findById(decoded.id).select('-password');
            return next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Acceso no autorizado');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Acceso no autorizado, no ingresaste el token');
    }
};

module.exports = { protect };