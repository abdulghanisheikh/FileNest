const express = require("express");
const router = express.Router();
const upload = require("../config/multer.config.js");
const { uploadFile, uploadProfile } = require("../controllers/upload.controller.js");
const isLoggedIn = require("../middlewares/isLoggedIn.js");
const { fileStorage, getAllFiles } = require("../controllers/file.controller.js");
const {deleteAccount, removeUserProfile} = require("../controllers/user.controller.js");

router.post("/upload", isLoggedIn, upload.single("uploaded-file"), uploadFile);

router.get("/usedStorage", isLoggedIn, fileStorage);

router.post("/uploadProfile", isLoggedIn, upload.single("profile"), uploadProfile);

router.get("/getUploadHistory", isLoggedIn, getAllFiles);

router.delete("/deleteAccount", isLoggedIn, deleteAccount);

router.delete("/removeProfile", isLoggedIn, removeUserProfile);

module.exports = router;