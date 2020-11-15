// Initializing Database
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://educator:" + process.env.DB_PASSWORD + "@cluster0.2dn7v.mongodb.net/" + process.env.DB_NAME + "?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let database;
client.connect().then(db => database = db)

module.exports = class DbWrapper {
    static getUserByName(name) {
        return new Promise((resolve, reject) => {
            database.db(process.env.DB_NAME).collection(process.env.DB_COLLEC_USERS)
                .find({name : name})
                .toArray((err, res) => {
                if(err)
                    reject(err)
                resolve(res);
            });
        })
    }

    static getUserByEmail(email) {
        return new Promise((resolve, reject) => {
            database.db(process.env.DB_NAME).collection(process.env.DB_COLLEC_USERS)
                .find({email: email})
                .toArray((err, res) => {
                if(err)
                    reject(err)
                resolve(res);
            });
        })
    }

    static async insertUser({name, password, email}) {
        return new Promise((resolve, reject) => {
            database.db(process.env.DB_NAME).collection(process.env.DB_COLLEC_USERS)
                    .insertOne(
                        {
                            name: name,
                            password: password,
                            email: email,
                            _id: new ObjectId()
                        }, (err) => {
                            if(err)
                                reject(err)
                            resolve()
                    }
            );
        });
    }

    static async insertComment({_id, name, course, text, slide}) {
        return new Promise((resolve, reject) => {
            database.db(process.env.DB_NAME).collection(process.env.DB_COLLEC_COMMENT)
                    .insertOne(
                        {
                            _id: _id,
                            name: name,
                            course: course,
                            text: text,
                            slide: slide
                        }, (err) => {
                            if(err)
                                reject(err)
                            resolve()
                    }
            );
        });
    }

    static getCommentsBySlides(slide) {
        return new Promise((resolve, reject) => {
            database.db(process.env.DB_NAME).collection(process.env.DB_COLLEC_COMMENT)
                .find({slide: slide})
                .toArray((err, res) => {
                if(err)
                    reject(err)
                resolve(res);
            });
        })
    }

    static getCommentByUser(_id) {
        return new Promise((resolve, reject) => {
            database.db(process.env.DB_NAME).collection(process.env.DB_COLLEC_COMMENT)
                .find({_id: _id})
                .toArray((err, res) => {
                if(err)
                    reject(err)
                resolve(res);
            });
        })
    }
}