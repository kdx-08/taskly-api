const { User } = require("../models/User.js");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../middlewares/auth.middleware.js");

const registerRoute = async (req, res) => {
  const { name, username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser?.id) {
      return res.status(409).json({ message: "User Already Exists" });
    }
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ name, username, email, passwordHash });
    const token = generateToken({ user_id: user.id });
    return res
      .cookie("auth_token", token, { httpOnly: true, maxAge: 10 * 60 * 1000 })
      .status(201)
      .json({ message: "User Account Created" });
  } catch (error) {
    console.log("error in register route");
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginRoute = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user) {
      const result = await bcrypt.compare(password, user.passwordHash);
      if (result) {
        const token = generateToken({ user_id: user.id });
        return res
          .cookie("auth_token", token, { httpOnly: true, maxAge: 10 * 60 * 1000 })
          .status(200)
          .json({ message: "User Login Successful" });
      }
    }
    return res.status(401).json({ message: "Invalid Credentials" });
  } catch (error) {
    console.log("error in login route");
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const logoutRoute = (req, res) => {
  req.user = undefined;
  return res.clearCookie("auth_token").status(200).json({ message: "Logout Successful" });
};

module.exports = { registerRoute, loginRoute, logoutRoute };
