const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn.js");
const { fetchDocs, deleteFile, getEachStorage, getImages, getMedia, getOthers } = require("../controllers/file.controller.js");

/**
 * @route GET /file/delete
 * @description delete the file
 * @access private
 */
router.get("/get-docs", isLoggedIn, fetchDocs);

/**
 * @route DELETE /file/delete
 * @description delete the file
 * @access private
 */
router.delete("/delete", isLoggedIn, deleteFile);

router.get("/eachStorage", isLoggedIn, getEachStorage);

router.get("/get-images", isLoggedIn, getImages);

router.get("/get-media", isLoggedIn, getMedia);

router.get("/get-others", isLoggedIn, getOthers);

module.exports = router;