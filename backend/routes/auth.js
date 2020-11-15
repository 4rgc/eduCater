var express = require('express');
var router = express.Router();

const dbWrapper = require('../js/db-wrapper');

router.post('/login', (req, res, next) => {
	const email = req.body.email;
	const token = req.body.token;
	dbWrapper.getUsersByEmail(email).then((user) => {
		console.log(user);
		dbWrapper.updateUser(user[0]._id, {
			token: token,
		});
	});

	res.json({
		success: true,
	});
});

router.post('/logout', (req, res, next) => {
	const token = req.body.token;
	dbWrapper.getUsersByToken(token).then((user) => {
		console.log(user);
		dbWrapper.updateUser(user[0]._id, {
			token: '',
		});
	});

	res.json({
		success: true,
	});
});

module.exports = router;
