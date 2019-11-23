// // // const fs = require("fs");
// // // const path = require("path");
// // const Cart = require("../models/cart");
// // const db = require("../util/database");
// // // const p = path.join(
// // //   path.dirname(process.mainModule.filename),
// // //   "data",
// // //   "products.json"
// // // );

// // // const getProductsFromFile = cb => {
// // //   fs.readFile(p, (err, fileContent) => {
// // //     if (err) {
// // //       cb([]);
// // //     } else {
// // //       cb(JSON.parse(fileContent));
// // //     }
// // //   });
// // // };

// // module.exports = class Product {
// //   constructor(id, title, imageUrl, description, price) {
// //     this.id = id;
// //     this.title = title;
// //     this.imageUrl = imageUrl;
// //     this.description = description;
// //     this.price = price;
// //   }

// //   save() {
// //     // getProductsFromFile(products => {
// //     //   if (this.id) {
// //     //     const existingproductindex = products.findIndex(p => p.id === this.id);
// //     //     let updatedproduct = [...products];
// //     //     updatedproduct[existingproductindex] = this;
// //     //     fs.writeFile(p, JSON.stringify(updatedproduct), err => {
// //     //       console.log(err);
// //     //     });
// //     //   } else {
// //     //     this.id = Math.random().toString();
// //     //     products.push(this);
// //     //     fs.writeFile(p, JSON.stringify(products), err => {
// //     //       console.log(err);
// //     //     });
// //     //   }
// //     // });
// //     return db.execute(
// //       "INSERT INTO products (title,imageUrl,description,price) VALUES (?,?,?,?)",
// //       [this.title, this.imageUrl, this.description, this.price]
// //     );
// //   }
// //   static delete(id) {
// //     // getProductsFromFile(products => {
// //     //   const product = products.find(p => p.id === id);
// //     //   const updatedProducts = products.filter(p => p.id !== id);
// //     //   fs.writeFile(p, JSON.stringify(updatedProducts), err => {
// //     //     if (!err) {
// //     //       //remove from cart also
// //     //       Cart.deleteProduct(id, product.price);
// //     //     } else console.log(err);
// //     //   });
// //     // });
// //   }
// //   static fetchAll(cb) {
// //     // getProductsFromFile(cb);
// //     return db.execute("SELECT * FROM products");
// //   }

// //   static findbyId(id) {
// //     // getProductsFromFile(products => {
// //     //   return cb(products.find(p => p.id === id));
// //     // });
// //     return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
// //   }
// // };
// //============================== ^^ OLD APPROACH ^^============================================

// //=============== || Sequelize || ===============
// const Sequelize = require("sequelize");

// const sequelize = require("../util/database");

// class Product extends Sequelize.Model {}

// Product.init(
//   {
//     id: {
//       type: Sequelize.INTEGER,
//       autoIncrement: true,
//       allowNull: false,
//       primaryKey: true
//     },
//     title: {
//       type: Sequelize.STRING,
//       allowNull: false
//     },
//     imageUrl: {
//       type: Sequelize.STRING,
//       allowNull: false
//     },
//     description: {
//       type: Sequelize.STRING,
//       allowNull: false
//     },
//     price: {
//       type: Sequelize.DOUBLE,
//       allowNull: false
//     }
//   },
//   { sequelize, modelName: "products" }
// );

// module.exports = Product;

// ======================MONGODB==================================

// const getDatabase = require("../util/database").getDatabase;
// const mongodb = require("mongodb");

// class Product {
//   constructor(id, userid, title, imageUrl, description, price) {
//     this.id = id ? new mongodb.ObjectId(id) : null;
//     this.userid = userid;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }
//   save() {
//     //save data to database mongodb.
//     const db = getDatabase();
//     let dbOp;
//     if (this.id) {
//       dbOp = db
//         .collection("products")
//         .updateOne({ _id: this.id }, { $set: this });
//     } else {
//       dbOp = db.collection("products").insertOne(this);
//     }
//     return dbOp
//       .then(result => {
//         console.log(result);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
//   static findAll() {
//     const db = getDatabase();
//     return db
//       .collection("products")
//       .find()
//       .toArray()
//       .then(result => {
//         console.log(result);
//         return result;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
//   static findById(id) {
//     const db = getDatabase();
//     return db
//       .collection("products")
//       .find({ _id: new mongodb.ObjectId(id) })
//       .next()
//       .then(product => {
//         console.log(product);
//         return product;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
//   showProductinfo() {
//     console.log(this);
//   }
// }
// // const product = new Product(
// //   null,
// //   "dummytitle",
// //   "dummyimageUrl",
// //   "Dummy_Description",
// //   "Dummy_price"
// // );
// // product.showProductinfo();
// =====================================MongoDb With Mongoose ===========================================

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productschema = new Schema({
  title: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  userid: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  }
});
// module.exports = Product;
module.exports = mongoose.model("product", productschema);
