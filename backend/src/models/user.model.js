const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        minLength: [3, "full name must be atleast 3 characters long"]
    },
    profilePicture: {
        type: String,
        default: "",
    },
    profileId: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minLength: [13, "email must be atleast 13 characters long"]
    },
    password: {
        type: String,
        required: function() {
            return !this.googleId;
        },
        minLength: [5, "password must be atleast 5 characters long"]
    },
    googleId: String,
    docUpdate: {
        type: Date,
        default: Date.now()
    },
    imageUpdate: {
        type: Date,
        default: Date.now()
    },
    mediaUpdate: {
        type: Date,
        default: Date.now()
    },
    otherUpdate: {
        type: Date,
        default: Date.now()
    },
    files: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "file"
    }]
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;