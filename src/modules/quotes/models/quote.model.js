const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    quoteId: { type: String, required: true, unique: true },
    quote: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
});

const Quote = mongoose.model('Quote', quoteSchema);

module.exports = Quote;