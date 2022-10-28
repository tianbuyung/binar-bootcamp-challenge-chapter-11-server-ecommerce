const express = require("express");
const passport = require("passport");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.get(
	"/",
	passport.authenticate("user-role", { session: false }),
	UserController.getUserById
);

router.get(
	"/badge",
	passport.authenticate("user-role", { session: false }),
	UserController.getBadgeByUser
);

router.get("/verify", UserController.verifyJwt);

router.post("/", UserController.createUser);

// router.post("/logout", UserController.logout);

router.post("/login", UserController.login);

router.put(
	"/edit",
	passport.authenticate("user-role", { session: false }),
	UserController.editUser
);

module.exports = router;
