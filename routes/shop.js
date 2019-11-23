const express = require("express");
const router = express.Router();
const isauth = require("../middleware/isauth");
//Custom Modules.
const shopController = require("../controller/shop");

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/products/:productId", shopController.getProduct);

router.get("/cart", isauth, shopController.getCart);

router.post("/cart", isauth, shopController.postCart);

router.post("/deleteItemfromcart", isauth, shopController.deleteItemfromcart);

router.get("/orders", isauth, shopController.getOrders);

router.post("/placeorder", isauth, shopController.placeorder);

// router.get("/checkout", shopController.checkout);

module.exports = router;
