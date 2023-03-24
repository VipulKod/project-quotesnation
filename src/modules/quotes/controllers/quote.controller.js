const Quote = require("../models/quote.model");

const getQuotes = async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const startIndex = (page - 1) * limit;

        const quotes = await Quote.find().sort({ date: -1 }).skip(startIndex).limit(limit);

        res.json(quotes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getQuoteById = async (req, res) => {
  try {
    const quote = await Quote.findOne({ quoteId: req.params.quoteId });
    if (!quote) {
      return res.status(404).json({ message: "Quote not found" });
    }
    res.json(quote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const createQuote = async (req, res) => {
  try {
    const { quoteId, quote, author } = req.body;

    // Check if quoteId already exists
    const existingQuote = await Quote.findOne({ quoteId });
    if (existingQuote) {
      return res.status(409).json({ message: "Quote already exists" });
    }

    // Create a new quote
    const newQuote = new Quote({
      quoteId,
      quote,
      author,
    });
    await newQuote.save();

    res.json(newQuote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateQuote = async (req, res) => {
  try {
    const { quote, author } = req.body;

    // Find the quote to update
    const quoteToUpdate = await Quote.findOne({ quoteId: req.params.quoteId });
    if (!quoteToUpdate) {
      return res.status(404).json({ message: "Quote not found" });
    }

    // Update the quote
    quoteToUpdate.quote = quote;
    quoteToUpdate.author = author;
    await quoteToUpdate.save();

    res.json(quoteToUpdate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteQuote = async (req, res) => {
  try {
    // Find the quote to delete
    const quoteToDelete = await Quote.findOne({ quoteId: req.params.quoteId });
    if (!quoteToDelete) {
      return res.status(404).json({ message: "Quote not found" });
    }

    // Delete the quote
    await quoteToDelete.remove();

    res.json({ message: "Quote deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getQuotes,
  getQuoteById,
  createQuote,
  updateQuote,
  deleteQuote,
};
