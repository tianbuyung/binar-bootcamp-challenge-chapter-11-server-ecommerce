const express = require("express");
const router = express.Router();
const cartDetailController = require("../controllers/CartDetailController");
const passport = require("passport");

router.post("/", passport.authenticate("user-role", { session: false }), cartDetailController.createCartDetail);
router.delete("/:id", passport.authenticate("user-role", { session: false }), cartDetailController.deleteCartDetail);

module.exports = router;
