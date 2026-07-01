import { body, validationResult } from "express-validator";

// Generic validation error handler
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

// Signup/Verify validation rules
export const verifyUserValidation = [
  body("fullName")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Full name must be 2-50 characters"),
  body("email")
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage("Valid email required"),
  body("photoURL")
    .optional()
    .isURL()
    .withMessage("Photo URL must be valid"),
  handleValidationErrors,
];

// Profile update validation
export const updateProfileValidation = [
  body("fullName")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Full name must be 2-50 characters"),
  body("phone")
    .optional()
    .trim()
    .matches(/^[+]?[\d\s-]{10,20}$/)
    .withMessage("Valid phone number required"),
  body("photoURL")
    .optional()
    .isURL()
    .withMessage("Photo URL must be valid"),
  handleValidationErrors,
];
