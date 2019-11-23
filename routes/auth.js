const express = require("express");
const router = express.Router();

const authcontroller = require("../controller/auth");

// GET == /login
router.get("/login", authcontroller.getlogin);

// POST == /login
router.post("/login", authcontroller.postlogin);

// POST == /logout
router.post("/logout", authcontroller.postlogout);

// GET == /signup
router.get("/signup", authcontroller.getSignup);

//POST == /signup
router.post("/signup", authcontroller.postSignup);
module.exports = router;
