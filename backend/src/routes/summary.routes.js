const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn.js");
const getSummary = require("../controllers/summary.controller.js");

/**
 * @route GET /summary/
 */
router.get("/", isLoggedIn, getSummary);

module.exports = router;