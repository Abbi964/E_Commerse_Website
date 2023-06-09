const mongodb = require('mongodb')

const getDB = require('../util/database').getDB;

class User{
  constructor(name,email){
    this.name = name;
    this.email = email
  }

  save(){
    const db = getDB();
    return db.collection('users').insertOne(this)
      .then(result =>{
        console.log(result)
      })
      .catch(err =>{
        console.log(err)
      })
  }

  static findUserById(userId){
    const db = getDB();
    return db.collection('users').findOne({_id : new mongodb.ObjectId(userId)})
      .then( user =>{
        console.log(user);
        return user;
      })
      .catch( err =>{
        console.log(err);
      })
  }
}

module.exports = User;
