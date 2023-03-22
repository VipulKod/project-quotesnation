const express = require("express");
const { authenticateUser } = require("../controllers/auth.controller");
const router = express.Router();

router.post("/", authenticateUser);

module.exports = router;
