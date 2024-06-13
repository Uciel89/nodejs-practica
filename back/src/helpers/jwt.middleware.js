const jwt = require('jsonwebtoken');
const { User } = require('../models');

require('dotenv').config();

const checkToken = async (req, res, next) => {
    if (!req.headers['authorization']) {
        return res.status(403).json({ message: 'No estas autorizado' });
    }

    const token = req.headers['authorization'];

    // Decodificación del token para comprobar si el usuario esta autorizado o no
    let payload;
    try {
        payload = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
        return res.status(403).json({ message: 'No estas autorizado' });
    }

    // Asignamos el usuario que obtenemos dentro de nuestra consultas y gracias a next ya vamos a poder trabajar con el mismos a lo largo de nuestra aplicación
    const user = await User.findByPk(payload.id);
    req.user = user;

    next();
}

module.exports = { checkToken };