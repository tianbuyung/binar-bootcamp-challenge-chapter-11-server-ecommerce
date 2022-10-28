const express = require("express");
const router = express.Router();
const passport = require("passport");
const productController = require("../controllers/ProductController");
const adminController = require("../controllers/AdminController");

router.get(
	"/products",
	passport.authenticate("admin-role", { session: false }),
	productController.getProduct
);
router.post(
	"/products",
	passport.authenticate("admin-role", { session: false }),
	productController.createProduct
);
router.put(
	"/products/:id",
	passport.authenticate("admin-role", { session: false }),
	productController.editProduct
);
router.delete(
	"/products/:id",
	passport.authenticate("admin-role", { session: false }),
	productController.deleteProduct
);
router.get(
	"/products/:id",
	passport.authenticate("admin-role", { session: false }),
	productController.getDetailProduct
);
router.post("/", adminController.loginAdmin);
// router.post("/logout", adminController.logoutAdmin);
router.get("/verify", adminController.verifyJwt);

module.exports = router;
