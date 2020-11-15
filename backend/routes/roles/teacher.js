var express = require('express');
var router = express.Router();

var middleware = require('../../js/middleware');
const url = require('url');
const querystring = require('querystring');
const dbWrapper = require('../../js/db-wrapper');

router.post(
	'/addTeacher',
	(q, s, n) => middleware.checkPrivilegePost(q, s, n, 'r'),
	function (req, res, next) {
		//TODO: update the record in the database

		res.json({
			success: true,
			message: 'New teacher: ' + req.body.name,
		});
	}
);

/* GET home page. */
router.post(
	'/changePLink',
	(q, s, n) => middleware.checkPrivilegePost(q, s, n, '>t'),
	function (req, res, next) {
		//TODO: update the record in the database

		res.json({
			success: true,
			message: 'New code: ' + req.body.code,
		});
	}
);

router.post(
	'/addCourse',
	(q, s, n) => middleware.checkPrivilegePost(q, s, n, '>t'),
	(req, res, next) => {
		res.json({
			success: true,
			message: 'Add course: ' + req.body.name,
		});
	}
);

router.get(
	'/getCourse',
	(q, s, n) => middleware.checkPrivilegeGet(q, s, n, '>s'),
	(req, res, next) => {
		let parsedUrl = url.parse(req.url);
		let parsedQs = querystring.parse(parsedUrl.query);

		const course_id = parsedQs['course_id'];

		if (!course_id) {
			res.json({
				success: false,
				message: 'Course id was ' + course_id,
			});
		}

		dbWrapper.getCourse(course_id).then((course) => {
			if (!course)
				res.json({
					success: false,
					message: 'Wrong course id',
				});
			else
				res.json({
					success: true,
					course: course,
				});
		});
	}
);

router.get(
	'/getCoursesTeaching',
	(q, s, n) => middleware.checkPrivilegeGet(q, s, n, 't'),
	(req, res, next) => {
		console.log('verification passed');
		let parsedUrl = url.parse(req.url);
		let parsedQs = querystring.parse(parsedUrl.query);

		let token = parsedQs['token'];

		dbWrapper.getUserByToken(token).then((user) => {
			if (!user)
				res.json({
					success: false,
					message: "User with this id doesn't exist",
				});
			else
				dbWrapper
					.getCourses({ teacher_id: user._id })
					.then((courses) => {
						res.json({
							success: true,
							courses: courses,
						});
					});
		});
	}
);

router.get(
	'/getCoursesEnrolled',
	(q, s, n) => middleware.checkPrivilegeGet(q, s, n, 's'),
	(req, res, next) => {
		let parsedUrl = url.parse(req.url);
		let parsedQs = querystring.parse(parsedUrl.query);

		let token = parsedQs['token'];

		dbWrapper.getUserByToken(token).then((user) => {
			if (!user)
				res.json({
					success: false,
					message: "User with this id doesn't exist",
				});
			else
				dbWrapper
					.getCourses({
						studentList: { $in: [user._id] },
					})
					.then((courses) => {
						res.json({
							success: true,
							courses: courses,
						});
					});
		});
	}
);

router.get(
	'/getMaterial',
	(q, s, n) => middleware.checkPrivilegeGet(q, s, n, '>s'),
	(req, res, next) => {
		let parsedUrl = url.parse(req.url);
		let parsedQs = querystring.parse(parsedUrl.query);

		const material_id = parsedQs['material_id'];

		if (!material_id) {
			res.json({
				success: false,
				message: 'Material id was ' + material_id,
			});
		}

		dbWrapper.getMaterial(material_id).then((material) => {
			if (!material)
				res.json({
					success: false,
					message: "Material with this id doesn't exist",
				});
			else
				res.json({
					success: true,
					material: material,
				});
		});
	}
);

router.get(
	'/getComment',
	(q, s, n) => middleware.checkPrivilegeGet(q, s, n, '>s'),
	(req, res, next) => {
		let parsedUrl = url.parse(req.url);
		let parsedQs = querystring.parse(parsedUrl.query);

		let comment_id = parsedQs['comment_id'];

		if (!comment_id) {
			res.json({
				success: false,
				message: 'Comment id was ' + comment_id,
			});
		}

		dbWrapper.getComment(comment_id).then((comment) => {
			if (!comment)
				res.json({
					success: false,
					message: 'Comment with this id does not exist',
				});
			else
				res.json({
					success: true,
					comment: comment,
				});
		});
	}
);

module.exports = router;
