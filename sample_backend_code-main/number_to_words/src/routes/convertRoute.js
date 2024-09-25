const express = require("express");

const multer = require("multer");
const router = express.Router();
const convertController = require("../controllers/convertController");

const storage = multer.memoryStorage();
const upload = multer({ storage });
// Apply validation middleware to the /convert endpoint
router.post(
  "/convert",
  convertController.convertValidationMiddleware,
  convertController.convertNumberToWords
);
router.post(
  "/compare",
  upload.fields([{ name: "file1" }, { name: "file2" }]),
  (req, res) => {
    const file1 = req.files["file1"][0];
    const file2 = req.files["file2"][0];
    if (!file1 || !file2) {
      return res.status(400).json({ error: "Both files are required." });
    }

    const comparisonResult = {
      file1Name: file1.originalname,
      file2Name: file2.originalname,
      message: "Files compared successfully!",
    };

    res.json(comparisonResult);
  }
);

module.exports = router;
