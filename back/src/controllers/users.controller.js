const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey = '2649e839842e8886797768390b90443bbcd373c6601b4c8a2482f112b9f29bdc';

// Modelo
const { User } = require('../models');

// Métodos del controlador
const register = async (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 8);

    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (error) {
        res.status(400).json(error);
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({  where: { email }});

    // Validacion si existe el usuario
    if (!user) {
        return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }

    // Validacion si existe de la contraseña
    if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }

    const token = jwt.sign({ id: user.id }, secretKey);
    res.json({ token });
}


module.exports = { register, login };