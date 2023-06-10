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
      .then(result => { console.log(result) })
      .catch(err => console.log(err))
  }

  getCart() {
    const db = getDB();

    // first getting array of all the product ids from this.cart
    let prodIdArr = this.cart.items.map(ele => {
      return ele.productId
    });

    // now getting all the products from product collection with ids in prodIdArr
    return db.collection('products').find({ _id: { $in: prodIdArr } }).toArray()
      .then(products => {
        return products.map(prod => {
          return {
            ...prod,
            quantity: this.cart.items.find(i => {
              return i.productId.toString() === prod._id.toString()
            }).quantity
          }
        })
      })
  }

  deleteProductFromCart(prodId) {
    // finding index of product to delete
    let prodIndex = this.cart.items.findIndex(ele => {
      return ele.productId.toString() === prodId.toString()
    })

    // now removing product from that index
    let updatedItemsArray = [...this.cart.items]
    updatedItemsArray.splice(prodIndex, 1);

    let updatedCart = { items: updatedItemsArray }

    // now updating the cart
    const db = getDB();
    return db.collection('users').updateOne(
      { _id: new mongodb.ObjectId(this._id) },
      { $set: { cart: updatedCart } }
    )
      .then(result => { console.log(result) })
      .catch(err => console.log(err))
  }
}

module.exports = User;
