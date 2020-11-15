var express = require('express');
var router = express.Router();
const { ObjectID } = require('mongodb');

var middleware = require('../js/middleware');
const url = require('url');
const querystring = require('querystring');
const dbWrapper = require('../js/db-wrapper');

router.post(
	'/addTeacher',
	(q, s, n) => middleware.checkPrivilegePost(q, s, n, 'r'),
	(req, res, next) => {
		//
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

router.post(
	'/postComment',
	(q, s, n) => middleware.checkPrivilegePost(q, s, n, '>s'),
	(req, res, next) => {
		let material_id = req.body.material_id;
		let user_id = req.body.user_id;
		let contents = req.body.contents;
		let datePosted = req.body.datePosted;
		let slideNumber = req.body.slideNumber;
		let topLeft = req.body.topLeft;
		let bottomRight = req.body.bottomRight;

		console.log(topLeft.x + ', ' + topLeft.y + ' ' + bottomRight);

		let errormsg = '';
		if (!material_id) errormsg += 'Material id is missing\n';
		if (!user_id) errormsg += 'User id is missing\n';
		if (!contents) errormsg += 'Contents are missing\n';
		if (!datePosted) errormsg += 'Date Posted is missing\n';
		if (!slideNumber) errormsg += 'Slide number is missing\n';

		if (errormsg != '')
			return res.json({
				success: false,
				message: errormsg,
			});

		dbWrapper
			.insertComment({
				user_id: new ObjectID(user_id),
				contents,
				datePosted: JSON.parse(datePosted),
				slideNumber,
				topLeft: JSON.parse(topLeft),
				bottomRight: JSON.parse(bottomRight),
			})
			.then((result) => {
				dbWrapper
					.updateMaterial(new ObjectID(material_id), {
						$addToSet: {
							comments: new ObjectID(result.insertedId),
						},
					})
					.then((update) => {
						res.json({
							success: true,
							insertedId: result.insertedId,
						});
					});
			});
		//dbWrapper.insertComment({user_id, contents, datePosted, slideNumber, datePosted, topLeft, bottomRight})
	}
);

module.exports = router;
