import { body } from "express-validator";

export const registerValidator = [
    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required")
        .isLength({ min: 3 })
        .withMessage("Username must be at least 3 characters long"),
    body("email")
        .trim()
        .isEmail()
        .withMessage("Invalid email address")
        .normalizeEmail(),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
];
