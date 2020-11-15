var express = require('express');
var router = express.Router();

const cookieParser = require('cookie-parser');

router.post('/login', (req, res, next) => {
	console.log(req.body.token);

	res.json({
		success: true,
	});
});

router.post('/logout', (req, res, next) => {
	console.log(req.body.token);

	res.json({
		success: true,
	});
});

module.exports = router;
