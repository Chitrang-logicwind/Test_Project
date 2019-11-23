//Core Module
// const http = require("http");
const path = require("path");

//Thired-Party Module
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

// #cookie = #@asdfknkd@#$Q&ETVQQ4q4awerw3 =====> $session : loggedin = value;
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const uri = "mongodb://localhost/Database";
const store = new MongoDBStore({
  uri: uri,
  databaseName: "Database",
  collection: "session"
});

// const sequelize = require("./util/database");
// const expresshbs = require("express-handlebars");

//Custom Modules
const adminrouter = require("./routes/admin");
const shoprouter = require("./routes/shop");
const authrouter = require("./routes/auth");
const errorController = require("./controller/error");
// const mongoConnect = require("./util/database").mongoConnect;
// const Products = require("./models/product");
const User = require("./models/user");
// const Cart = require("./models/cart");
// const Cartitem = require("./models/cart-item");

// db.execute("SELECT * FROM products")
//   .then(result => {
//     console.log(result);
//   })
//   .catch(err => {
//     console.log(err);
//   });
//setting-up view engines.
// app.engine("hbs", expresshbs({ defaultLayout: null }));
// app.set("view engine", "hbs");
//app.set("view engine", "pug");
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store
  })
);
//"5dd67318340f0f0e6fe339cf"
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => {
      console.log(err);
    });
});

//Custom Routes
app.use("/admin", adminrouter);
app.use(authrouter);
app.use(shoprouter);

app.use(errorController.get404);

// { useNewUrlParser: true, useUnifiedTopology: true }
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    //if No User Is There Then Create One.
    // User.findOne().then(user => {
    //   if (!user) {
    //     const user = new User({
    //       name: "FirstUser",
    //       email: "test@test.com",
    //       cart: { items: [] }
    //     });
    //     return user.save();
    //   }
    console.log("Listinig on Port number 3000...");
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
// mongoConnect(() => {
//   app.listen(3000);
// });

//Server Creation & Waiting For Client Input
// const server = http.createServer(app);
// server.listen(3000);
//===================== sequelizer =================================
// Products.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
// User.hasMany(Products);
// User.hasOne(Cart);
// Cart.belongsTo(User);

// Cart.belongsToMany(Products, { through: Cartitem });
// Products.belongsToMany(Cart, { through: Cartitem });

// sequelize
//   .sync({ force: true })
//   //.sync()
//   .then(() => {
//     return User.findByPk(1);
//   })
//   .then(user => {
//     if (!user) {
//       return User.create({ name: "testname", email: "test@test.com" });
//     }
//     return user;
//   })
//   .then(user => {
//     return user.createCart();
//   })
//   .then(() => {
//     app.listen(process.env.PORT || 3000);
//   })
//   .catch(err => {
//     console.log(err);
//   });
