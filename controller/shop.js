//Custom Modules.
const Product = require("../models/product");
const Ordermodel = require("../models/order");
// const Cart = require("../models/cart");

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render("shop/index", {
        products: products,
        pagetitle: "Shop",
        path: "/",
        isauthenticated: req.session.loggedin
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render("shop/product-list", {
        products: products,
        pagetitle: "All Products",
        path: "/products",
        isauthenticated: req.session.loggedin
      });
    })
    .catch(err => {
      console.log(err);
    });
  // Product.fetchAll()
  //   .then(([rows, fieldData]) => {
  //     res.render("shop/product-list", {
  //       products: rows,
  //       pagetitle: "All Products",
  //       path: "/products"
  //     });
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
};

exports.getProduct = (req, res, next) => {
  Product.findById(req.params.productId)
    .then(product => {
      console.log(product);
      res.render("shop/product-detail", {
        pagetitle: product.title,
        product: product,
        isauthenticated: req.session.loggedin
      });
    })
    .catch(err => {
      console.log(err);
    });
};
exports.getCart = (req, res, next) => {
  req.user
    .populate("cart.items.productid")
    .execPopulate()
    .then(user => {
      const products = user.cart.items;
      console.log(products);
      res.render("shop/cart", {
        path: "shop/cart",
        pagetitle: "Cart Page",
        cartproducts: products,
        isauthenticated: req.session.loggedin
      });
    })
    .catch(err => {
      console.log(err.message);
    });
};
// exports.getCart = (req, res, next) => {
//   req.user
//     .getCart()
//     .then(cart => {
//       return cart
//         .getProducts()
//         .then(products => {
//           return res.render("shop/cart", {
//             path: "shop/cart",
//             pagetitle: "Cart Page",
//             cartproducts: products
//           });
//         })
//         .catch(err => {
//           console.log(err);
//         });
//       console.log(cart);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// Cart.getCart(cart => {
//   Product.fetchAll()
//     .then(([rows, fieldData]) => {
//       // let cartProducts = [];
//       // for (product of products) {
//       //   const cartproductdata = cart.products.find(p => p.id === product.id);
//       //   if (cartproductdata) {
//       //     cartProducts.push({
//       //       productobject: product,
//       //       qty: cartproductdata.qut
//       //     });
//       //   }
//       // }
//       return res.render("shop/cart", {
//         path: "shop/cart",
//         pagetitle: "Cart Page",
//         cartproducts: rows
//       });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });
// };

//Adding Products inTo The Cart.
exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  //console.log(productId);
  Product.findById(productId)
    .then(product => {
      //console.log(product);
      return req.user.addtoCart(product);
    })
    .then(result => {
      console.log(result + "hear Added into cart");
      res.redirect("/cart");
    })
    .catch(err => {
      console.log(err);
    });
  // Product.findbyId(productId, product => {
  //   Cart.addProduct(productId, product.price);
  // });
};
exports.deleteItemfromcart = (req, res, next) => {
  // console.log(req.body.productId);
  req.user
    .deleteItemfromcart(req.body.productid)
    .then(result => {
      res.redirect("/cart");
    })
    .catch(err => {
      console.log(err);
    });
};

// GET orders
exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pagetitle: "Your Orders",
    isauthenticated: req.session.loggedin
  });
};

// POST orders
exports.placeorder = (req, res, next) => {
  console.log("On Order Page hear");
  req.user
    .populate("cart.items.productid")
    .execPopulate()
    .then(user => {
      const products = user.cart.items.map(i => {
        return { product: { ...i.productid._doc }, quantity: i.quantity };
      });
      const order = new Ordermodel({
        user: {
          userid: req.user,
          name: req.user.name
        },
        products: products
      });
      return order.save();
    })
    .then(() => {
      return req.user.clearCart();
    })
    .then(() => {
      res.render("shop/orders", {
        path: "/orders",
        pagetitle: "Your Orders",
        isauthenticated: req.session.loggedin
      });
    });
  //----------------------
};

// exports.checkout = (req, res, next) => {
//   res.render("shop/checkout.ejs", {
//     path: "/checkout",
//     pagetitle: "checkout Page"
//   });
// };
