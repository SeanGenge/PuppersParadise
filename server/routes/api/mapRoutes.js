const router = require('express').Router();

router.get('/', async (req, res) => {
	res.send({"Hello": "test"});
});

module.exports = router;