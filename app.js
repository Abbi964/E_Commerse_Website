require('dotenv').config()

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const errorController = require('./controllers/error');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const User = require('./models/user');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('64896cbeb2353eed960ae2fd')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));

});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.vghsxbb.mongodb.net/shop?retryWrites=true`)
  .then(result =>{
    // makign a dummy user if there is no user
    User.findOne()
      .then(user =>{
        if(!user){
          let user = new User({
            name : 'Abhinav',
            email : 'test@test.com',
            cart : { items : []}
          });
          user.save()
        }
      })

    // connecting to DB and starting server
    console.log('Connected to mongoDB using mongoose');
    app.listen(3000)
  })
  .catch(err => {console.log(err)})
