const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const Model = require("../models");
const { User, Admin } = Model;

const cookieExtractor = (req) => {
	let jwt = null;

	if (req && req.headers.authorization) {
		jwt = req.headers.authorization;
	}
	return jwt;
};

const cookieExtractorAdmin = (req) => {
	let jwt = null;

	if (req && req.headers.authorization) {
		jwt = req.headers.authorization;
	}
	return jwt;
};

const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.KEY;

const optsAdmin = {};
optsAdmin.secretOrKey = process.env.KEY;
optsAdmin.jwtFromRequest = cookieExtractorAdmin;

passport.use(
	"user-role",
	new JwtStrategy(opts, function (jwt_payload, done) {
		console.log("jwt_payload", jwt_payload);
		return User.findOne({ where: { email: jwt_payload.id } })
			.then((user) => {
				return done(null, user);
			})
			.catch((err) => {
				return done(err, false);
			});
	})
);

passport.use(
	"admin-role",
	new JwtStrategy(optsAdmin, function (jwt_payload, done) {
		return Admin.findOne({ where: { email: jwt_payload.id } })
			.then((admin) => {
				return done(null, admin);
			})
			.catch((err) => {
				return done(err, false);
			});
	})
);
