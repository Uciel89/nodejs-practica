const router = require('express').Router();
const fileUpload = require('express-fileupload');

// Configuración del middleware de fileupload, habilitando carpetas temporales para su posterior subida a cloudinary
router.use(fileUpload({
    useTempFiles: true,
    tempFileDir:'./src/tmp'
}))

const { uploadSong, search, deleteSong } = require('../../controllers/songs.controller');
const { checkToken } = require('../../helpers/jwt.middleware');

router.post('/upload', checkToken, uploadSong);
router.post('/search', search);
router.delete('/:song_id', checkToken, deleteSong);

module.exports = router;