require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const passport = require("passport");

const hashPassword = require("./utils/hashPassword");
require("./middleware/passport");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const adminRouter = require("./routes/admin");
const categoriesRouter = require("./routes/categories");
const cartsRouter = require("./routes/carts");
const cartDetailsRouter = require("./routes/cartDetails");
const ordersRouter = require("./routes/orders");

const productsRouter = require("./routes/product");
const app = express();
app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
		credentials: true,
	})
);
app.set("trust proxy", 1);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(hashPassword(process.env.COOKIE_KEY)));
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/admin", adminRouter);
app.use("/categories", categoriesRouter);
app.use("/carts", cartsRouter);
app.use("/cartDetails", cartDetailsRouter);
app.use("/orders", ordersRouter);
app.use("/product", productsRouter);

module.exports = app;
