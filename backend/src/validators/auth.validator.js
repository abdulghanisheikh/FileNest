const {body, validationResult} = require("express-validator");

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
}

const validateRegisterUser = [
    body("fullname")
        .notEmpty().withMessage("Fullname is required")
        .isLength({ min: 3 }).withMessage("Fullname should be atleast 3 character long"),
    body("email")
        .isEmail().withMessage("Invalid email format"),
    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({min: 5}).withMessage("Password should be atleast 5 character long"),
    validateRequest
];

const validateLoginUser = [
    body("email")
        .isEmail().withMessage("Invalid email format"),
    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({min: 5}).withMessage("Password should be atleast 5 character long"),
    validateRequest
];

module.exports = {validateRegisterUser, validateLoginUser};