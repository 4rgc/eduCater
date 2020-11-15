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

	static getUsersByEmail(email) {
		return new Promise((resolve, reject) => {
			database
				.db(process.env.DB_NAME)
				.collection(process.env.DB_COLLEC_USERS)
				.find({ email: email })
				.toArray((err, res) => {
					if (err) reject(err);
					resolve(res);
				});
		});
	}

	static getUsersByToken(token) {
		return new Promise((resolve, reject) => {
			database
				.db(process.env.DB_NAME)
				.collection(process.env.DB_COLLEC_USERS)
				.find({ token: token })
				.toArray((err, res) => {
					if (err) reject(err);
					resolve(res);
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

	static async insertUser({ name, password, email }) {
		return new Promise((resolve, reject) => {
			database
				.db(process.env.DB_NAME)
				.collection(process.env.DB_COLLEC_USERS)
				.insertOne(
					{
						name: name,
						password: password,
						email: email,
						_id: new ObjectId(),
					},
					(err) => {
						if (err) reject(err);
						resolve();
					}
				);
		});
	}

	static async insertComment({ _id, name, course, text, slide }) {
		return new Promise((resolve, reject) => {
			database
				.db(process.env.DB_NAME)
				.collection(process.env.DB_COLLEC_COMMENT)
				.insertOne(
					{
						_id: _id,
						name: name,
						course: course,
						text: text,
						slide: slide,
					},
					(err) => {
						if (err) reject(err);
						resolve();
					}
				);
		});
	}

	static getCommentsBySlides(slide) {
		return new Promise((resolve, reject) => {
			database
				.db(process.env.DB_NAME)
				.collection(process.env.DB_COLLEC_COMMENT)
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
};