const mongodb = require('mongodb')

const getDB = require('../util/database').getDB;

class User {
  constructor(name, email, cart, id) {
    this.name = name;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save() {
    const db = getDB();
    return db.collection('users').insertOne(this)
      .then(result => {
        console.log(result)
      })
      .catch(err => {
        console.log(err)
      })
  }

  static findById(userId) {
    const db = getDB();
    return db.collection('users').findOne({ _id: new mongodb.ObjectId(userId) })
      .then(user => {
        console.log(user);
        return user;
      })
      .catch(err => {
        console.log(err);
      })
  }

  addToCart(product) {
    // checking if product is already in cart or not
    const cartProductIndex = this.cart.items.findIndex(cp => {
      return cp.productId.toString() === product._id.toString()
    })
    const db = getDB();

    let newQuantity = 1;
    let updatedCartItem = [...this.cart.items]

    if (cartProductIndex >= 0) {
      // if product already exist in cart then increasing quantity
      newQuantity = this.cart.items[cartProductIndex].quantity + 1
      updatedCartItem[cartProductIndex].quantity = newQuantity;
    }
    else {
      // if product does not exist than adding product
      updatedCartItem.push({
        productId: new mongodb.ObjectId(product._id),
        quantity: newQuantity,
      })
    }

    const updatedCart = { items: updatedCartItem }

    // updating the cart
    return db.collection('users').updateOne(
      { _id: new mongodb.ObjectId(this._id) },
      { $set: { cart: updatedCart } }
    )
    .then(result =>{console.log(result)})
    .catch(err => console.log(err))
  }
}

module.exports = User;
