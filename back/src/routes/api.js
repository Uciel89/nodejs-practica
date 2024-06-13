const router = require('express').Router();

router.use('/users', require('./v1/user.routes'));
router.use('/artists', require('./v1/artists.routes'));
router.use('/songs', require('./v1/songs.routes'));

module.exports = router;