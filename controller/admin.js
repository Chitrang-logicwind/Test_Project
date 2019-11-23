//Custom Modules.
const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pagetitle: "Admin Page",
    path: "admin/edit-product",
    editmode: false,
    isauthenticated: req.session.loggedin
  });
};

exports.getEditProduct = (req, res, next) => {
  let editmode = req.query.edit;
  editmode = editmode === "true" ? true : false;
  // console.log(`${editmode} ${typeof editmode} ====  ${req.params.productId}`);
  if (!editmode) {
    return res.redirect("/");
  }
  // req.user
  //   .getProducts({ where: { id: req.params.productId } })
  // Product.findByPk(req.params.productId)
  Product.findById(req.params.productId)
    .then(product => {
      // const product = products[0];
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pagetitle: "Edit Product Page",
        path: "admin/edit-product",
        editmode: editmode,
        product: product,
        isauthenticated: req.session.loggedin
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postAddProduct = (req, res, next) => {
  // const title = req.body.title;
  // const imageUrl = req.body.imageUrl;
  // const description = req.body.description;
  // const price = req.body.price;
  // const product = new Product(null, title, imageUrl, description, price);
  // product
  //   .save()
  //   .then(() => {
  //     return res.redirect("/");
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  //========== Sequelize ===========
  // req.user // Create Product Row With Using Requested User id:1|2|..
  //   .createProduct({
  //     title: req.body.title,
  //     imageUrl: req.body.imageUrl,
  //     description: req.body.description,
  //     price: req.body.price
  //   })
  //   .then(() => {
  //     console.log("Data Inserted into Table");
  //     return res.redirect("products");
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  //====================MONGODB===========================

  // const product = new Product(
  //   null,
  //   req.user,
  //   req.body.title,
  //   req.body.imageUrl,
  //   req.body.description,
  //   req.body.price
  // );

  const product = new Product({
    userid: req.user._id,
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    description: req.body.description,
    price: req.body.price
  });
  product
    .save()
    .then(result => {
      console.log(result);
      res.redirect("/admin/add-product");
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postEditProduct = (req, res, next) => {
  // console.log(req.body.productId);
  const updated = {
    id: req.body.productId,
    userid: req.user,
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    description: req.body.description,
    price: req.body.price
  };
  // const Updatedproduct = new Product(
  //   updated.id,
  //   updated.title,
  //   updated.imageUrl,
  //   updated.description,
  //   updated.price
  // );
  // Updatedproduct.save();
  // Product.findByPk(updated.id)

  // product.title = updated.title;
  // product.imageUrl = updated.imageUrl;
  // product.description = updated.description;
  // product.price = updated.price;
  // const product = new Product(
  //   updated.id,
  //   updated.userid,
  //   updated.title,
  //   updated.imageUrl,
  //   updated.description,
  //   updated.price
  // );
  // console.log(updated.id);
  Product.findById(updated.id)
    .then(product => {
      product.title = updated.title;
      product.imageUrl = updated.imageUrl;
      product.description = updated.description;
      product.price = updated.price;
      return product.save();
    })
    .then(() => {
      console.log("Data Save Succesfully in DataBase.");
      res.redirect("/");
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  // Product.destroy({ where: { id: req.body.productId } })
  Product.findByIdAndRemove(req.body.productId)
    .then(() => {
      console.log(`Product With Id: ${req.body.productId} was Deleted.`);
      return res.redirect("/admin/products");
    })
    .catch(err => {
      console.log(err);
    });
  // Product.delete(req.body.productId);
};

exports.getProducts = (req, res, next) => {
  // req.user
  //   .getProducts()
  Product.find()
    // .select("title imageUrl -_id")
    // .populate("userid", "name")
    .then(products => {
      res.render("admin/products", {
        products: products,
        pagetitle: "Admin Products",
        path: "/admin/products",
        isauthenticated: req.session.loggedin
      });
    })
    .catch(err => {
      console.log(err);
    });
  // Product.fetchAll()
  //   .then(([rows, fieldData]) => {
  //     res.render("admin/products", {
  //       products: rows,
  //       pagetitle: "Admin Products",
  //       path: "/admin/products"
  //     });
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
};
