const express = require("express");
const passport = require("passport");
const router = express.Router();
const cartController = require("../controllers/CartController");

router.get("/", passport.authenticate("user-role", { session: false }), cartController.getCart);

module.exports = router;
