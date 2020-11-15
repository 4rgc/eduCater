// Initializing Database
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.2dn7v.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
let database;
client.connect().then((db) => (database = db));

module.exports = class DbWrapper {
	static getUser(_id) {
		return new Promise((resolve, reject) => {
			database
				.db(process.env.DB_NAME)
				.collection(process.env.DB_COLLEC_USERS)
				.find({ _id })
				.toArray((err, res) => {
					if (err) reject(err);
					resolve(res[0]);
				});
		});
	}

	static getUsersByName(name) {
		return new Promise((resolve, reject) => {
			database
				.db(process.env.DB_NAME)
				.collection(process.env.DB_COLLEC_USERS)
				.find({ name: name })
				.toArray((err, res) => {
					if (err) reject(err);
					resolve(res);
				});
		});
	}

	static getUserByEmail(email) {
		return new Promise((resolve, reject) => {
			database
				.db(process.env.DB_NAME)
				.collection(process.env.DB_COLLEC_USERS)
				.find({ email: email })
				.toArray((err, res) => {
					if (err) reject(err);
					resolve(res[0]);
				});
		});
	}

	static getUserByToken(token) {
		return new Promise((resolve, reject) => {
			database
				.db(process.env.DB_NAME)
				.collection(process.env.DB_COLLEC_USERS)
				.find({ token: token })
				.toArray((err, res) => {
					if (err) reject(err);
					resolve(res[0]);
				});
		});
	}

	static updateUser(id, values) {
		return new Promise((resolve, reject) => {
			database
				.db(process.env.DB_NAME)
				.collection(process.env.DB_COLLEC_USERS)
				.updateOne({ _id: id }, { $set: values }, (err, res) => {
					if (err) reject(err);
					resolve(res);
				});
		});
	}

	static async insertUser({ name, email, role, token }) {
		return new Promise((resolve, reject) => {
			database
				.db(process.env.DB_NAME)
				.collection(process.env.DB_COLLEC_USERS)
				.insertOne(
					{
						name: name,
						email: email,
						role: role,
						token: token,
					},
					(err) => {
						if (err) reject(err);
						resolve();
					}
				);
		});
	}

	static getComment(_id) {
		return new Promise((resolve, reject) => {
			database
				.db(process.env.DB_NAME)
				.collection(process.env.DB_COLLEC_COMMENTS)
				.find({ _id })
				.toArray((err, res) => {
					if (err) reject(err);
					resolve(res[0]);
				});
		});
	}

	static insertComment({
		user_id,
		contents,
		datePosted,
		slideNumber,
		topLeft,
		bottomRight,
	}) {
		return new Promise((resolve, reject) => {
			database
				.db(process.env.DB_NAME)
				.collection(process.env.DB_COLLEC_COMMENTS)
				.insertOne({
					user_id: user_id,
					contents: contents,
					datePosted: datePosted,
					replies: [],
					slideNumber: slideNumber,
					topLeft: topLeft,
					bottomRight: bottomRight,
				})
				.then((result, err) => {
					if (err) reject(err);
					resolve(result);
				});
		});
	}

	static getCommentsBySlides(slide) {
		return new Promise((resolve, reject) => {
			database
				.db(process.env.DB_NAME)
				.collection(process.env.DB_COLLEC_COMMENTS)
				.find({ slide: slide })
				.toArray((err, res) => {
					if (err) reject(err);
					resolve(res);
				});
		});
	}

	static getCommentByUser(_id) {
		return new Promise((resolve, reject) => {
			database
				.db(process.env.DB_NAME)
				.collection(process.env.DB_COLLEC_COMMENT)
				.find({ _id: _id })
				.toArray((err, res) => {
					if (err) reject(err);
					resolve(res);
				});
		});
	}

	static getMaterial(_id) {
		return new Promise((resolve, reject) => {
			database
				.db(process.env.DB_NAME)
				.collection(process.env.DB_COLLEC_MATERIALS)
				.find({ _id: _id })
				.toArray((err, res) => {
					if (err) reject(err);
					resolve(res[0]);
				});
		});
	}

	static updateMaterial(_id, params) {
		return new Promise((resolve, reject) => {
			database
				.db(process.env.DB_NAME)
				.collection(process.env.DB_COLLEC_MATERIALS)
				.updateOne({ _id: _id }, params, (err, res) => {
					if (err) reject(err);
					resolve(res);
				});
		});
	}

	static insertCourse(values) {
		return new Promise((resolve, reject) => {
			database
				.db(process.env.DB_NAME)
				.collection(process.env.DB_COLLEC_COURSES)
				.insertOne(
					{
						name: values.name,
						courseCode: values.courseCode,
						teacher_id: values.teacher_id,
						studentList: [],
						materials: [],
					},
					(err) => {
						if (err) reject(err);
						resolve();
					}
				);
		});
	}

	static getCourse(_id) {
		return new Promise((resolve, reject) => {
			database
				.db(process.env.DB_NAME)
				.collection(process.env.DB_COLLEC_COURSES)
				.find({ _id: _id })
				.toArray((err, res) => {
					if (err) reject(err);
					resolve(res[0]);
				});
		});
	}

	static getCourses(params) {
		return new Promise((resolve, reject) => {
			database
				.db(process.env.DB_NAME)
				.collection(process.env.DB_COLLEC_COURSES)
				.find(params)
				.toArray((err, res) => {
					if (err) reject(err);
					resolve(res);
				});
		});
	}

	static updateCourse(_id, params) {
		return new Promise((resolve, reject) => {
			database
				.db(process.env.DB_NAME)
				.collection(process.env.DB_COLLEC_COURSES)
				.updateOne({ _id }, params, (err, res) => {
					if (err) reject(err);
					resolve(res);
				});
		});
	}

	static insertMaterial(params) {
		return new Promise((resolve, reject) => {
			database
				.db(process.env.DB_NAME)
				.collection(process.env.DB_COLLEC_MATERIALS)
				.insertOne({ ...params, comments: [] }, (err) => {
					if (err) reject(err);
					resolve();
				});
		});
	}
};
