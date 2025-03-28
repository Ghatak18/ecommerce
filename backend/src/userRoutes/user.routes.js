const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator");
const {registerUser} = require("../userController/user.controller.js")


router.post('/register', [
        check("firstname").notEmpty().withMessage("First name is required"),
        check("lastname").notEmpty().withMessage("Last name is required"),
        check("email").isEmail().withMessage("Invalid email address"),
        check("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters long")
    ],registerUser)

module.exports = router;