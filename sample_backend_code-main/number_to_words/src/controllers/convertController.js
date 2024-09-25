const numberModel = require("../models/numberModel");

// Import express-validator middleware
const {
  convertValidationRules,
  validate,
} = require("../validators/numberValidator");

// POST /convert endpoint handler
exports.convertNumberToWords = (req, res) => {
  const { number } = req.body;
  const words = numberModel.convertToWords(number);
  return res.json({ status: "success", words: words });
};

// Apply validation middleware to the /convert endpoint
exports.convertValidationMiddleware = [convertValidationRules(), validate];
