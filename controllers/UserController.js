const { User } = require("../models");
const db = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUserById = async (req, res) => {
	try {
		const user = req.user;
		res.status(200).json({
			message: "Successfully get detail a user",
			user,
		});
	} catch (error) {
		res.status(400).json({
			message: error.message,
		});
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const cekUser = await User.findOne({
			where: {
				email: email,
			},
		});

		if (!cekUser) {
			return res.status(401).json({
				message: "Wrong email or password",
			});
		}

		const cekPass = await bcrypt.compare(password, cekUser.password);

		if (!cekPass) {
			return res.status(401).json({
				message: "Wrong email or password",
			});
		}

		const payload = {
			id: cekUser.email,
		};

		const secret = process.env.KEY;
		const token = jwt.sign(payload, secret, { expiresIn: "1 hour" });
		return await res.status(200).json({
			message: "Login successful",
			token,
		});
	} catch (error) {
		return await res.status(500).json({
			message: "error while authenticating user " + error.message,
		});
	}
};

const verifyJwt = (req, res) => {
	const token = req.headers.authorization;
	jwt.verify(token, process.env.KEY, (err, result) => {
		if (err) {
			res.status(403).json({
				message: "unauthorized",
			});
		} else {
			res.status(200).json({
				message: "authorized",
			});
		}
	});
};

const logout = async (req, res) => {
	try {
		// localStorage.setItem("token", "");

		return await res.status(200).send({
			message: "Successfully logged out",
		});
	} catch (error) {
		console.log("error logout : ", error);
		return await res.status(500).json({
			message: "error while logout",
		});
	}
};

const createUser = async (req, res) => {
	try {
		const { nama, password, email } = req.body;

		const cekEmail = await User.findOne({
			where: {
				email: email,
			},
		});

		if (cekEmail) {
			return res.status(409).json({
				message: "Email already exist, Please use another email address",
			});
		}

		await User.create({
			name: nama,
			password: password,
			email: email,
		});

		return res.status(200).json({
			message: "Successfully create user",
		});
	} catch (error) {
		res.status(500).json({
			message: "error creating user",
		});
	}
};

const getBadgeByUser = async (req, res) => {
	const UserId = req.user.id;
	try {
		const [results, metadata] = await db.sequelize
			.query(`SELECT "Cart"."UserId" AS "userId", sum("totalOrder") AS "totalShop"
    FROM "Orders" AS "Order"
    JOIN "Carts" AS "Cart" ON "Order"."CartId" = "Cart"."id" AND "Cart"."UserId" = ${UserId}
    GROUP BY "Cart"."UserId";`);

		let val = await results[0].totalShop;
		let badge = "Basic";

		if (val > 100000000) {
			badge = "Ruby Diamond";
		} else if (val > 10000000) {
			badge = "Diamond";
		} else if (val > 1000000) {
			badge = "Gold";
		} else if (val > 100000) {
			badge = "Silver";
		}

		res.status(200).json({
			message: "Successfully get detail a badge this user",
			results,
			badge,
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({
			message: error.message,
			results: [
				{
					UserId,
					totalShop: 0,
				},
			],
			badge: "Basic",
		});
	}
};

const editUser = async (req, res) => {
	try {
		const id = req.user.id;
		const { name, address, phoneNumber, twitter, instagram, facebook } =
      req.body;
		const options = {
			where: {
				id,
			},
		};
		let user = await User.findOne(options);
		if (user) {
			await User.update(
				{
					name,
					address,
					phoneNumber,
					twitter,
					instagram,
					facebook,
				},
				options
			);
			res.status(200).json({
				message: "The user has been successfully updated",
			});
		} else {
			res.status(400).json({
				message: "The user is not found!",
			});
		}
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

module.exports = {
	login,
	verifyJwt,
	createUser,
	getUserById,
	getBadgeByUser,
	editUser,
};
