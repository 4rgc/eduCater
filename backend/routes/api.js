var express = require('express');
var router = express.Router();
var path = require('path');

const commentsRouter = require('./comments');
const coursesRouter = require('./courses');

router.use('/', commentsRouter);
router.use('/', coursesRouter);

router.get('/test', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/test.html'));
});

router.get('/test2', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/test2.html'));
});

module.exports = router;
