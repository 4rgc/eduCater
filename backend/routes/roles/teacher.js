var express = require('express');
var router = express.Router();

const url = require('url');
const querystring = require('querystring');

/* GET home page. */
router.post('/changePLink', function (req, res, next) {
	//TODO: update the record in the database

	res.json({
		message: 'New code: ' + req.body.code,
		success: true,
	});
});

router.post('/addCourse', (req, res, next) => {
	res.json({
		message: 'Add course: ' + req.body.name,
		success: true,
	});
});

module.exports = router;
