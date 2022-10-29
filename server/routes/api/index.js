const router = require('express').Router();
const imageRoutes = require('./imageRoute.js');

router.use('/image', imageRoutes);

module.exports = router;
