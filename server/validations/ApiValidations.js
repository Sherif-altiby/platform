import { body } from "express-validator";

export const validateRegistration = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .withMessage("Password must contain at least one uppercase letter"),

  body("level").notEmpty().withMessage("Level is required"),

  body("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone()
    .withMessage("Invalid phone number")
    .trim(),

  body("parentPhone")
    .notEmpty()
    .withMessage("parent phone number is required")
    .isMobilePhone()
    .withMessage("Invalid phone number")
    .trim(),
];

export const uploadVideoValidation = [
  body("link")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 20 })
    .withMessage("Name must be at least 20 characters long"),

  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 5 })
    .withMessage("Name must be at least 5 characters long"),

  body("level")
    .notEmpty()
    .withMessage("Level is required")
    .isIn(["first", "second", "third"])
    .withMessage("Invalid level"),
];

 
 
