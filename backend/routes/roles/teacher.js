var express = require('express');
var router = express.Router();

var middleware = require('../../js/middleware');
const url = require('url');
const querystring = require('querystring');

router.post('/addTeacher', middleware.checkRepPost, function (req, res, next) {
	//TODO: update the record in the database

	res.json({
		success: true,
		message: 'New teacher: ' + req.body.name,
	});
});

/* GET home page. */
router.post('/changePLink', middleware.checkTeacherPost, function (
	req,
	res,
	next
) {
	//TODO: update the record in the database

	res.json({
		success: true,
		message: 'New code: ' + req.body.code,
	});
});

router.post('/addCourse', middleware.checkTeacherPost, (req, res, next) => {
	res.json({
		success: true,
		message: 'Add course: ' + req.body.name,
	});
});

router.get('/getPLink', (req, res, next) => {
	let parsedUrl = url.parse(req.url);
	let parsedQs = querystring.parse(parsedUrl.query);

	const id = parsedQs['id'];

	res.json({
		success: true,
		link:
			id == 0
				? 'https://educater.s3.ca-central-1.amazonaws.com/HOW+TO+FIND+THE+DENSITY+FUNCTION+OF+A+TRANSFORMATION.docx+(1).pdf'
				: '/assets/testdoc2.pdf',
	});
});

module.exports = router;
