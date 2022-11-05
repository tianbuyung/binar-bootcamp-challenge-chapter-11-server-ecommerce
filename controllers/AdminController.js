const { Admin } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginAdmin = async (req, res) => {
	try {
		const { email, password } = req.body;

		const cekUser = await Admin.findOne({ where: { email: email } });

		if (!cekUser) {
			return res.status(401).send({
				message: "Wrong email or password",
			});
		}

		const cekPassword = await bcrypt.compare(password, cekUser.password);

		if (!cekPassword) {
			return res.status(401).send({
				message: "Wrong email or password",
			});
		}

		const payload = {
			id: cekUser.email,
		};

		const secret = process.env.KEY;
		let token = jwt.sign(payload, secret, { expiresIn: "1 hour" });

		if (process.env.NODE_ENV == "test") {
			token = jwt.sign(payload, secret);
		}

		return await res.status(200).send({
			message: "Login successful",
			token: token,
		});
	} catch (err) {
		return await res.status(500).json({
			message: "error while authenticating user " + err.message,
		});
	}
};

const verifyJwt = (req, res) => {
	const token = req.headers.authorization;
	jwt.verify(token, process.env.KEY, (err) => {
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

// const logoutAdmin = async (req, res) => {
// 	try {
// 		localStorage.setItem("tokenAdmin", "");

// 		return await res.status(200).send({
// 			message: "Successfully logged out",
// 		});
// 	} catch (error) {
// 		return await res.status(500).json({
// 			message: "error while logout",
// 		});
// 	}
// };

module.exports = { loginAdmin, verifyJwt };
