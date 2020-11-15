var express = require('express');
var router = express.Router();
const { ObjectID } = require('mongodb');

var middleware = require('../js/middleware');
const url = require('url');
const querystring = require('querystring');
const dbWrapper = require('../js/db-wrapper');

router.post(
	'/updateCourse',
	(q, s, n) => middleware.checkPrivilegePost(q, s, n, '>t'),
	function (req, res, next) {
		let id = req.body.id;
		let name = req.body.name;
		let courseCode = req.body.courseCode;

		let params = {};
		if (name) params['name'] = name;
		if (courseCode) params['courseCode'] = courseCode;

		params = { $set: params };
		if (!id)
			res.json({
				success: false,
				message: 'Id was not provided',
			});

		dbWrapper
			.updateCourse(id, params)
			.then((result) => {
				res.json({
					success: true,
					result: result,
				});
			})
			.catch((err) => {
				res.json({
					success: false,
					message: 'Error: ' + err.message,
				});
			});
	}
);

router.post(
	'/addCourseStudent',
	(q, s, n) => middleware.checkPrivilegePost(q, s, n, '>t'),
	function (req, res, next) {
		let course_id = req.body.course_id;
		let user_id = req.body.user_id;

		if (!course_id)
			res.json({
				success: false,
				message: 'Course id was not provided',
			});
		if (!user_id)
			res.json({
				success: false,
				message: 'User id was not provided',
			});

		let params = {
			$addToSet: { studentList: new ObjectID(user_id) },
		};

		dbWrapper
			.updateCourse(new ObjectID(course_id), params)
			.then((result) => {
				res.json({
					success: true,
					result: result,
				});
			})
			.catch((err) => {
				res.json({
					success: false,
					message: 'Error: ' + err.message,
				});
			});
	}
);

router.post(
	'/addCourseMaterial',
	(q, s, n) => middleware.checkPrivilegePost(q, s, n, '>t'),
	function (req, res, next) {
		let course_id = req.body.course_id;
		let name = req.body.name;
		let datePosted = req.body.datePosted;
		let link = req.body.link;

		if (!course_id) {
			res.json({
				success: false,
				message: 'Course id was not provided',
			});
		}

		if (!name)
			res.json({
				success: false,
				message: 'Name was not provided',
			});
		if (!datePosted)
			res.json({
				success: false,
				message: 'DatePosted was not provided',
			});
		if (!link)
			res.json({
				success: false,
				message: 'Link was not provided',
			});

		dbWrapper
			.insertMaterial({ name, datePosted, link })
			.then((result) => {
				dbWrapper
					.updateCourse(course_id, {
						$addToSet: { materials: result.insertedId },
					})
					.then(() => {
						res.json({
							success: true,
						});
					});
			})
			.catch((err) => {
				res.json({
					success: false,
					message: 'Error: ' + err.message,
				});
			});
	}
);

router.post(
	'/addCourse',
	(q, s, n) => middleware.checkPrivilegePost(q, s, n, '>t'),
	(req, res, next) => {
		let name = req.body.name,
			courseCode = req.body.courseCode,
			teacher_id = req.body.teacher_id;

		if (!name) {
			res.json({
				success: false,
				message: 'Course with this id not found',
			});
		}
		if (!courseCode) {
			res.json({
				success: false,
				message: 'Course with this id not found',
			});
		}
		if (!teacher_id) {
			res.json({
				success: false,
				message: 'Course with this id not found',
			});
		}

		dbWrapper
			.insertCourse({ name, courseCode, teacher_id })
			.then((result) => {
				res.json({
					success: true,
					insertedId: result.insertedId,
				});
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

module.exports = router;
