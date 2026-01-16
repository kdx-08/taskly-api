const { User } = require("../models/User.js");
const { Task } = require("../models/Task.js");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../middlewares/auth.middleware.js");

const registerRoute = async (req, res) => {
  const { name, username, email, password } = req.body;
  const ip = req.ip;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser?.id) {
      return res.status(409).json({ message: "User Already Exists" });
    }
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ name, username, email, passwordHash, ip });
    const token = generateToken({ user_id: user.id });
    return res
      .cookie("auth_token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "lax",
        secure: process.env.DEV_ENV === "production",
      })
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
          .cookie("auth_token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "lax",
            secure: process.env.DEV_ENV === "production",
          })
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

const getAccountData = async (req, res) => {
  const user_id = req.user.user_id;
  const responseBody = {};
  try {
    const { createdAt, email, name, updatedAt, username } = await User.findById(user_id);
    const response = await Task.find({ user_id });
    responseBody.account = { name, email, username, createdAt, updatedAt };
    responseBody.data = [];
    for (let { title, status, description, createdAt, updatedAt } of response) {
      const newItem = { title, status, description, createdAt, updatedAt };
      responseBody.data.push(newItem);
    }
    return res.status(200).json(responseBody);
  } catch (error) {
    console.log("error in get account data route");
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteAccount = async (req, res) => {
  const user_id = req.user.user_id;
  try {
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: "Account Not Found" });
    } else {
      await User.findByIdAndDelete(user_id);
      return res.clearCookie("auth_token").status(200).json({ message: "Account Deleted Successfully" });
    }
  } catch (error) {
    console.log("error in delete account route");
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { registerRoute, loginRoute, logoutRoute, getAccountData, deleteAccount };
