const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectId

const getDB = require('../util/database').getDB;

class Order{
  constructor(products,id){
    this._id = id;
    this.products = products;
  }

  save(){
    const db = getDB();
    // making a new order
    return db.collection('orders').insertOne(this)
      .then(result => console.log(result))
      .catch(err => console.log(err))
  }
}

module.exports = Order;
