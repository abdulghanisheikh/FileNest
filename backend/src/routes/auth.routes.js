const express = require("express");
const router = express.Router();
const { signup, login, logout, getMe, googleCallback } = require("../controllers/auth.controller.js");
const userModel = require("../models/user.model.js");
const isLoggedIn = require("../middlewares/isLoggedIn.js");
const {validateRegisterUser, validateLoginUser} = require("../validators/auth.validator.js");
const passport = require("passport");

/**
 * @route POST /auth/create
 */
router.post("/create", validateRegisterUser, signup);

/**
 * @route POST /auth/login
 */
router.post("/login", validateLoginUser, login);

/**
 * @route POST /auth/logout
 */
router.post("/logout", isLoggedIn, logout);

/**
 * @route GET /auth/google
 */
router.get("/google", passport.authenticate("google", {scope: ['email', 'profile']}));

/**
 * @route GET /auth/google/callback
 */
router.get("/google/callback", passport.authenticate("google", { session: false }), googleCallback);

/**
 * @route GET /auth/getMe
 */
router.get("/getMe", isLoggedIn, getMe);

module.exports = router;