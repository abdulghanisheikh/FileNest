const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model.js");

function isLoggedIn(req, res, next) {
	try {
		const token = req.cookies.token;

		if (!token) {
			return res.status(401).json({
				success: false,
				message: "No token, unauthorized access",
			});
		}

		let decoded = jwt.verify(token, process.env.JWT_SECRET);

		req.user = decoded;
		next();
	} catch (err) {
		return res.status(500).json({
			success: false,
			error: err.message,
		});
	}
}

module.exports = isLoggedIn;
