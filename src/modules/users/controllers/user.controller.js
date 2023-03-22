const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { v4: uuidv4 } = require('uuid');

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user with the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      userId: uuidv4(),
      username,
      email,
      password: hashedPassword,
    });
    await user.save();

    res.status(201).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  registerUser,
};
