// const Sequelize = require("sequelize");

// const sequelize = require("../util/database");

// class User extends Sequelize.Model {}

// User.init(
//   {
//     id: {
//       type: Sequelize.INTEGER,
//       autoIncrement: true,
//       allowNull: false,
//       primaryKey: true
//     },
//     name: {
//       type: Sequelize.STRING,
//       allowNull: false
//     },
//     email: {
//       type: Sequelize.STRING,
//       allowNull: false
//     }
//   },
//   { sequelize, modelName: "user" }
// );
// const getDatabase = require("../util/database").getDatabase;
// const ObjectId = require("mongodb").ObjectId;
// class User {
//   constructor(id, name, email, cart) {
//     this.id = id;
//     this.name = name;
//     this.email = email;
//     this.cart = cart; // { items : [productid,quantity] }
//   }
//   save() {
//     const db = getDatabase();
//     return db
//       .collection("users")
//       .insertOne(this)
//       .then(result => {
//         console.log(result);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
//   addtoCart(product) {
//     const db = getDatabase();
//     let updatedCart;
//     let newquantity = 1;
//     let updatedcartitems = [...this.cart.items];

//     const itemIndex = this.cart.items.findIndex(
//       itemid => itemid._id.toString() === product._id.toString()
//     );
//     if (itemIndex >= 0) {
//       //product already exists.
//       newquantity = this.cart.items[itemIndex].quantity + 1;
//       updatedcartitems[itemIndex].quantity = newquantity;
//     } else {
//       //if we Dont Have Cart at First Time.
//       //create for First Time.
//       updatedcartitems.push({
//         productid: new ObjectId(product._id),
//         quantity: newquantity
//       });
//     }

//     updatedCart = {
//       items: updatedcartitems
//     };
//     return db
//       .collection("users")
//       .updateOne(
//         { _id: new ObjectId(this.id) },
//         { $set: { cart: updatedCart } }
//       )
//       .then(result => {
//         console.log(result);
//         return result;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
//   getCart() {
//     const db = getDatabase();
//     const productids = this.cart.items.map(p => {
//       return p.productid;
//     });
//     return db
//       .collections("products")
//       .find({ _id: { $in: productids } })
//       .toArray()
//       .then(products => {
//         return products.map(p => {
//           return {
//             ...p,
//             quantity: this.cart.items.find(i => {
//               return i.productid.toString() === p._id.toString();
//             }).quantity
//           };
//         });
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
//   deleteItemfromcart(productid) {
//     const db = getDatabase();
//     const updateProductlist = this.cart.items.filter(item => {
//       return item.productid.toString() !== productid.toString();
//     });
//     db.collection("users").updateOne(
//       { _id: new ObjectId(this.id) },
//       { $set: { cart: { items: updateProductlist } } }
//     );
//   }
//   static findById(userid) {
//     const db = getDatabase();
//     return db
//       .collection("users")
//       .findOne({ _id: new ObjectId(id) })
//       .then(user => {
//         console.log(user);
//         return user;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
// }
// module.exports = User;

//==============MONGOOSE==========================

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userschema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cart: {
    items: [
      {
        productid: {
          type: Schema.Types.ObjectId,
          ref: "product",
          required: true
        },
        quantity: { type: Number, required: true }
      }
    ]
  }
});

userschema.methods.addtoCart = function(product) {
  let newquantity = 1;
  let updatedcartitems = [...this.cart.items];

  const itemIndex = this.cart.items.findIndex(
    item => item.productid._id.toString() === product._id.toString()
  );
  if (itemIndex >= 0) {
    //product already exists.
    newquantity = this.cart.items[itemIndex].quantity + 1;
    updatedcartitems[itemIndex].quantity = newquantity;
  } else {
    //if we Dont Have Cart at First Time.
    //create for First Time.
    updatedcartitems.push({
      productid: product._id,
      quantity: newquantity
    });
  }
  this.cart.items = updatedcartitems;
  return this.save();
};

userschema.methods.deleteItemfromcart = function(productid) {
  console.log(productid);
  const updatedcartitems = this.cart.items.filter(
    item => item.productid.toString() !== productid.toString()
  );
  this.cart.items = updatedcartitems;
  return this.save();
};
userschema.methods.clearCart = function() {
  this.cart = { items: [] };
  return this.save();
};
module.exports = mongoose.model("user", userschema);
