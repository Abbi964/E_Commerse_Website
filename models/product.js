const mongodb = require('mongodb')
const getDB = require('../util/database').getDB;

class Product {
  constructor(title,price,description,imageUrl,id){
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id;
  }

  save(){
    const db = getDB();
    if(this._id){
      // update the product
      return db.collection('products').updateOne({_id : new mongodb.ObjectId(this._id)},{$set : this})
        .then((result)=>{
          console.log(result);
        })
        .catch((err)=>{
          console.log(err);
        })
    }
    else{
      // make new product
      return db.collection('products').insertOne(this)
        .then((result)=>{
          console.log(result);
        })
        .catch((err)=>{
          console.log(err);
        })
    }
  }

  static fetchAll(){
    const db = getDB();
    return db.collection('products')
      .find()
      .toArray()
      .then(products=>{
        console.log(products)
        return products
      })
      .catch(err=>{
        console.log(err)
      })
  }

  static findById(prodId){
    const db = getDB();
    return db.collection('products')
      .find({_id : new mongodb.ObjectId(prodId)})   // as _id provided by mongoDB is "ObjectId" type and not a string
      .next()
      .then(product=>{
        console.log(product)
        return product
      })
      .catch(err=>{
        console.log(err)
      })
  }

  static deleteById(prodId){
    const db = getDB();
    return db.collection('products').deleteOne({_id : new mongodb.ObjectId(prodId)})
      .then(result =>{
        console.log(result)
      })
      .catch(err => {
        console.log(err)
      })
  }

}


// const Product = sequelize.define('product', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   title: Sequelize.STRING,
//   price: {
//     type: Sequelize.DOUBLE,
//     allowNull: false
//   },
//   imageUrl: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }
// });

module.exports = Product;
