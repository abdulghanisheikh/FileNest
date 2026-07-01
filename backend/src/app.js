require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const morgan = require("morgan");

const app = express();

const authRouter = require("./routes/auth.routes.js");
const userRouter = require("./routes/user.routes.js");
const fileRouter = require("./routes/file.routes.js");
const summaryRouter = require("./routes/summary.routes.js");
const { profile } = require("./config/llm.config.js");

app.use(cors({
    origin: ["http://localhost:5173", process.env.FRONTEND],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(passport.initialize());

const callbackUrl = process.env.NODE_ENV === "development" ? 
    "http://localhost:3000/auth/google/callback" :
    process.env.GOOGLE_CALLBACK_URL

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: callbackUrl
}, (_, __, profile, done) => {
    return done(null, profile);
}));

// routes
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/file", fileRouter);
app.use("/summary", summaryRouter);

app.get("/", (req, res) => {
    res.send("Server is running");
});

module.exports = app;