const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secretKey = '2649e839842e8886797768390b90443bbcd373c6601b4c8a2482f112b9f29bdc';

const checkToken = async (req, res, next) => {
    if (!req.headers['authorization']) {
        return res.status(403).json({ message: 'No estas autorizado' });
    }

    const token = req.headers['authorization'];

    // Decodificación del token para comprobar si el usuario esta autorizado o no
    let payload;
    try {
        payload = jwt.verify(token, secretKey);
    } catch (error) {
        return res.status(403).json({ message: 'No estas autorizado' });
    }

    // Asignamos el usuario que obtenemos dentro de nuestra consultas y gracias a next ya vamos a poder trabajar con el mismos a lo largo de nuestra aplicación
    const user = await User.findByPk(payload.id);
    req.user = user;

    next();
}

module.exports = { checkToken };