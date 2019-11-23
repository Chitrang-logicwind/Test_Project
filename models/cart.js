// // const path = require("path");
// // const fs = require("fs");
// // const rootdir = require("../util/path");
// // const cartfile = path.join(rootdir, "data", "cart.json");

// // module.exports = class Cart {
// //   static addProduct(id, price) {
// //     fs.readFile(cartfile, (err, filecontent) => {
// //       let cart = { products: [], totalprice: 0 };
// //       if (!err) {
// //         cart = JSON.parse(filecontent);
// //       }
// //       let existingproductIndex = cart.products.findIndex(p => p.id === id);
// //       let existingproduct = cart.products[existingproductIndex];
// //       let updatedProduct;
// //       if (existingproduct) {
// //         updatedProduct = existingproduct;
// //         updatedProduct.qut = updatedProduct.qut + 1;
// //         //cart.products = [...cart.products];
// //         cart.products[existingproductIndex] = updatedProduct;
// //       } else {
// //         updatedProduct = { id: id, qut: 1 };
// //         cart.products = [...cart.products, updatedProduct];
// //       }
// //       cart.totalprice = cart.totalprice + +price;
// //       fs.writeFile(cartfile, JSON.stringify(cart), err => {
// //         console.log(err);
// //       });
// //     });
// //   }

// //   static deleteProduct(id, productPrice) {
// //     fs.readFile(cartfile, (err, filecontent) => {
// //       if (err) return;
// //       let updateCart = { ...JSON.parse(filecontent) };
// //       const product = updateCart.products.find(p => p.id === id);
// //       updateCart.products = updateCart.products.filter(p => p.id !== id);
// //       updateCart.totalprice =
// //         updateCart.totalprice - productPrice * product.qut;
// //       console.log("product removed from file");
// //       fs.writeFile(cartfile, JSON.stringify(updateCart), err => {
// //         console.log(err);
// //       });
// //     });
// //   }

// //   static getCart(cb) {
// //     fs.readFile(cartfile, (err, filecontent) => {
// //       if (err) return cb(null);
// //       cb(JSON.parse(filecontent));
// //     });
// //   }
// // };
// // ============================= ^^^ Old Approach Using File Sysyem ^^^ ==========================================

// const Sequelize = require("sequelize");

// const sequelize = require("../util/database");

// class Cart extends Sequelize.Model {}

// Cart.init(
//   {
//     id: {
//       type: Sequelize.INTEGER,
//       autoIncrement: true,
//       allowNull: false,
//       primaryKey: true
//     }
//   },
//   { sequelize },
//   { modelName: "cart" }
// );

// module.exports = Cart;
