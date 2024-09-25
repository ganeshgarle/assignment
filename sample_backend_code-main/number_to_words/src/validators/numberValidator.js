// validators/numberValidator.js

// Import express-validator
const { body, validationResult } = require("express-validator");

// Define validation middleware for the convert endpoint
exports.convertValidationRules = () => {
  return [
    // Validate the 'number' field
    body("number")
      .notEmpty()
      .withMessage("Number is required")
      .isInt({ min: 0, max: 999 })
      .withMessage("Number must be an integer between 0 and 999"),
  ];
};

// Middleware to handle validation errors
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ status: "error", message: errors.array()[0].msg });
  }
  next();
};
