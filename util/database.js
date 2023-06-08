const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let db;

const mongoConnect = (callback) => {
  MongoClient.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.vghsxbb.mongodb.net/`)
    .then((client)=>{
      console.log('Connected to mongoDB');
      db = client.db()
      callback();
    })
    .catch((err)=>{
      console.log('Error occurd while connecting to mondoDB',err)
    })
}

const getDB = ()=>{
  if(db){
    return db
  }
  throw('No database found')
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;

