const express = require("express");
const router = express.Router();
// const path = require("path");
// const rootdir = require("../util/path");
//Custom Modules.
const adminController = require("../controller/admin");
const isauth = require("../middleware/isauth");

// /admin/add-product
router.get("/add-product", isauth, adminController.getAddProduct);

// /admin/add-product
router.post("/add-product", isauth, adminController.postAddProduct);

// /admin/edit-product/123456
router.get("/edit-product/:productId", isauth, adminController.getEditProduct);

// /admin/edit-product
router.post("/edit-product", isauth, adminController.postEditProduct);

// admin/products
router.get("/products", isauth, adminController.getProducts);

// /admin/delete-product
router.post("/delete-product", isauth, adminController.postDeleteProduct);

module.exports = router;
