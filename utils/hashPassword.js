const bcrypt = require("bcrypt");

function hashPassword(password) {
	const SALT_ROUNDS = 10;

	return bcrypt.hashSync(password, SALT_ROUNDS);
}

module.exports = hashPassword;
