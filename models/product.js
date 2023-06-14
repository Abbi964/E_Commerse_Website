const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title : {
    type : String,
    required : true
  },
  price : {
    type : Number,
    required : true
  },
  description : {
    type : String,
    required : true
  },
  imageUrl : {
    type : String,
    required : true
  },
});

module.exports = mongoose.model('Product',productSchema)


// const mongodb = require('mongodb')
// const getDB = require('../util/database').getDB;

// class Product {
//   constructor(title,price,description,imageUrl,id,userId){
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id;
//     this.userId = userId;
//   }

//   save(){
//     const db = getDB();
//     if(this._id){
//       // update the product
//       return db.collection('products').updateOne({_id : new mongodb.ObjectId(this._id)},{$set : this})
//         .then((result)=>{
//           console.log(result);
//         })
//         .catch((err)=>{
//           console.log(err);
//         })
//     }
//     else{
//       // make new product
//       return db.collection('products').insertOne(this)
//         .then((result)=>{
//           console.log(result);
//         })
//         .catch((err)=>{
//           console.log(err);
//         })
//     }
//   }

//   static fetchAll(){
//     const db = getDB();
//     return db.collection('products')
//       .find()
//       .toArray()
//       .then(products=>{
//         console.log(products)
//         return products
//       })
//       .catch(err=>{
//         console.log(err)
//       })
//   }

//   static findById(prodId){
//     const db = getDB();
//     return db.collection('products')
//       .find({_id : new mongodb.ObjectId(prodId)})   // as _id provided by mongoDB is "ObjectId" type and not a string
//       .next()
//       .then(product=>{
//         console.log(product)
//         return product
//       })
//       .catch(err=>{
//         console.log(err)
//       })
//   }

//   static deleteById(prodId){
//     const db = getDB();
//     return db.collection('products').deleteOne({_id : new mongodb.ObjectId(prodId)})
//       .then(result =>{
//         console.log(result)
//       })
//       .catch(err => {
//         console.log(err)
//       })
//   }

// }

// module.exports = Product;
