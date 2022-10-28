const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/CategoryController");

router.get("/", categoryController.getCategories);
router.get("/:id", categoryController.getCategoryProduct);

module.exports = router;
