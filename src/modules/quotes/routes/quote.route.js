const express = require("express");
const {
  getQuotes,
  getQuoteById,
  createQuote,
  updateQuote,
  deleteQuote,
} = require("../controllers/quote.controller");
const router = express.Router();

router.get("/", getQuotes);
router.get("/:id", getQuoteById);
router.post("/", createQuote);
router.put("/", updateQuote);
router.delete("/", deleteQuote);

module.exports = router;