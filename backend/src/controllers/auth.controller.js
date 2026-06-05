const userModel = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const sendTokenResponse = async({user, res, message}) => {
	try {
		const token = jwt.sign(
			{ id: user._id },
			process.env.JWT_SECRET,
			{ expiresIn: "24h" },
		);

		res.cookie("token", token, {
			httpOnly: true, // JS can't access cookies in frontend
			secure: process.env.NODE_ENV === "development" ? false : true,
			maxAge: 24 * 60 * 60 * 1000, // 1 day
			sameSite: "none", // allow cross-origin domain
		});

		return res.status(200).json({
			success: true,
			message,
			user: {
				username: user.fullname,
				email: user.email,
				profilePicture: user.profilePicture
			},
		});
	} catch(err) {
		return res.status(500).json({
			success: false,
			error: err.message
		});
	}
}

const signup = async(req, res) => {
	const { fullname, email, password } = req.body;

	try {
		const existingUser = await userModel.findOne({
			$or: [
				{fullname},
				{email}
			]
		});

		if(existingUser) {
			return res.status(400).json({
				success: false,
				message: "User already exist"
			});
		}

		bcrypt.hash(password, 10, async (err, hash) => {

			const newUser = await userModel.create({
				fullname,
				email,
				password: hash,
			});

			await sendTokenResponse({ user: newUser, res, message: "User created" });
		});
	} catch (err) {
		res.status(500).json({
			message: "Server error",
			error: err.message,
			success: false,
		});
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await userModel.findOne({ email });

		if (!user) {
			return res.status(400).json({
				message: "User not exist",
				success: false,
			});
		}
		
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({
				message: "Email or password is incorrect",
				success: false,
			});
		}

		await sendTokenResponse({ user, res, message: "Login Successfull" });
	} catch (err) {
		res.status(500).json({
			message: "Server error",
			error: err.message,
			success: false,
		});
	}
};

const googleCallback = async(req, res) => {
	const {id, displayName, emails, photos} = req.user;
	const email = emails[0].value;
	const profilePicture = photos[0].value;

	try {
		let user = await userModel.findOne({email});

		if(!user) {
			user = await userModel.create({
				fullname: displayName,
				email,
				profilePicture,
				googleId: id
			});
		}

		const token = await jwt.sign(
			{ id: user._id },
			process.env.JWT_SECRET,
			{ expiresIn: "1d" }
		);

		res.cookie("token", token);

		res.redirect("http://localhost:5173/dashboard");
	} catch(err) {
		return res.status(500).json({
			success: false,
			error: err.message
		});
	}
}

const logout = async (req, res) => {
	try {
		res.clearCookie("token", {
			httpOnly: true,
			secure: true,
			sameSite: "none",
		});

		return res.status(200).json({
			success: true,
			message: "Logout successfull",
		});

	} catch (err) {
		return res.status(500).json({
			success: false,
			message: "Server error",
			error: err.message,
		});
	}
};

const getMe = async (req, res) => {
	try {
		const user = await userModel.findById(req.user.id);

		res.status(200).json({
			success: true,
			message: "User fetched",
			user: {
				username: user.fullname,
				email: user.email,
				profilePicture: user.profilePicture
			}
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: "Something went wrong",
			error: err.message
		});
	}
}

module.exports = { signup, login, logout, getMe, googleCallback };
