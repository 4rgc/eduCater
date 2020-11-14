var express = require('express');
var router = express.Router();
var path = require('path');

const teacherRouter = require('./roles/teacher');

router.use('/', teacherRouter);

router.get('/test', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/test.html'));
});

module.exports = router;
