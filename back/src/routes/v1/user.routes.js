const router = require('express').Router();
const { register, login } = require('../../controllers/users.controller');

// Definición de rutas para los usuarios
router.post('/register', register)
router.post('/login', login)

module.exports = router;