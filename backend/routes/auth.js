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
	dbWrapper.getUserByToken(token).then((user) => {
		dbWrapper.updateUser(user._id, {
			token: '',
		});
	});

	res.json({
		success: true,
	});
});

router.post('/register', (req, res, next) => {
	const token = req.body.token;
	const email = req.body.email;
	const name = req.body.name;

	dbWrapper.insertUser({ email, token, name, role: 's' }).then((user) => {
		res.json({
			success: true,
			user: user,
		});
	});
});

module.exports = router;