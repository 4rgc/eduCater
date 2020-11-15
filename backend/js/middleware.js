const dbWrapper = require('./db-wrapper');

const url = require('url');
const querystring = require('querystring');

const map = { s: 0, t: 1, r: 2 };

const getPrivilege = (token) => {
	return new Promise((resolve, reject) => {
		dbWrapper.getUserByToken(token).then((user) => {
			if (user) resolve(user.role);
			else reject('Token not found');
		});
	});
};

const checkPrivilegeGet = (req, res, next, filter) => {
	const parsedUrl = url.parse(req.url);
	const parsedQs = querystring.parse(parsedUrl.query);
	const token = parsedQs['token'];

	if (!token)
		return res.json({
			success: false,
			message: 'Auth token not supplied',
		});

	getPrivilege(token).then((userPrivilege) => {
		if (!userPrivilege)
			return res.json({
				success: false,
				message: 'Bad db record',
			});

		if (filter[0] == '!' && filter[1] != userPrivilege) return next();
		if (filter[0] == '<' && map[filter[1]] > map[userPrivilege]) next();
		if (filter[0] == '>' && map[filter[1]] > map[userPrivilege]) next();
		if (userPrivilege >= filter) return next();
		else
			res.json({
				success: false,
				message: "User's privilege is not high enough",
			});
	});
};

const checkPrivilegePost = (req, res, next, filter) => {
	let token = req.body.token;

	if (!token)
		return res.json({
			success: false,
			message: 'Auth token not supplied',
		});

	getPrivilege(token).then((userPrivilege) => {
		if (!userPrivilege)
			res.json({
				success: false,
				message: 'Bad db record',
			});

		if (filter[0] == '!' && filter[1] != userPrivilege) next();
		if (filter[0] == '<' && map[filter[1]] >= map[userPrivilege]) next();
		if (filter[0] == '>' && map[filter[1]] <= map[userPrivilege]) next();
		console.log(userPrivilege + ' ' + filter);
		if (userPrivilege == filter) next();
		else
			res.json({
				success: false,
				message: "User's privilege is not high enough",
			});
	});
};

function checkRepPost(req, res, next) {
	return checkPrivilegePost(req, res, next, 'r');
}
function checkTeacherPost(req, res, next) {
	checkPrivilegePost(req, res, next, 't');
}
function checkNotTeacherPost(req, res, next) {
	checkPrivilegePost(req, res, next, '!t');
}
function checkStudentPost(req, res, next) {
	checkPrivilegePost(req, res, next, 's');
}
function checkNotStudentPost(req, res, next) {
	checkPrivilegePost(req, res, next, '!s');
}
function checkRepGet(req, res, next) {
	checkPrivilegeGet(req, res, next, 'r');
}
function checkTeacherGet(req, res, next) {
	checkPrivilegeGet(req, res, next, 't');
}
function checkNotTeacherGet(req, res, next) {
	checkPrivilegeGet(req, res, next, '!t');
}
function checkStudentGet(req, res, next) {
	checkPrivilegeGet(req, res, next, 's');
}
function checkNotStudentGet(req, res, next) {
	checkPrivilegeGet(req, res, next, '!s');
}

module.exports = {
	checkPrivilegePost,
	checkPrivilegeGet,
};
