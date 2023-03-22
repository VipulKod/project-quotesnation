const express = require("express");
const router = express.Router();
const authRoutes = require("./modules/auth/routes/auth.route");
const userRoutes = require("./modules/users/routes/user.route");
const quoteRoutes = require("./modules/quotes/routes/quote.route");

// defined API routes here
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/quote", quoteRoutes);

module.exports = router;
