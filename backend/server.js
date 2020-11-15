// Initializing Database
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://educator:" + process.env.DB_PASSWORD + "@cluster0.2dn7v.mongodb.net/" + process.env.DB_NAME + "?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let database;
client.connect().then(db => database = db)

module.exports = class DbWrapper {
    static getUserByName(name) {
        return new Promise((resolve, reject) => {
            database.db(process.env.DB_NAME).collection(process.env.USERS)
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
            database.db(process.env.DB_NAME).collection(process.env.USERS)
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
            database.db(process.env.DB_NAME).collection(process.env.USERS)
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
}