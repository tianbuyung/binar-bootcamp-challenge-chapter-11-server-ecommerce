const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");

router.get("/popular", productController.getProductPopular);
router.get("/:id", productController.getDetailProductUser);

module.exports = router;
