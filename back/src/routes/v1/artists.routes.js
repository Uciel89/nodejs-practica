const router = require('express').Router();

const { getAll, ownArtists, getById, getSongsByArtist, create, search } = require('../../controllers/artists.controller');
const { checkToken } = require('../../helpers/jwt.middleware');

// Rutas con métodos GET
router.get('/', getAll);
router.get('/own', checkToken, ownArtists);
router.get('/:id', getById); // :id --> Valor dinamico
router.get('/songs/:artist_id', getSongsByArtist);

// Rutas con métodos POST
router.post('/', checkToken, create);
router.post('/search', search);

module.exports = router;
