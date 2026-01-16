const { userJoi, User } = require("../models/User.js");
const jwt = require("jsonwebtoken");

const validateRegisterForm = (req, res, next) => {
  const ip = req.ip;
  try {
    const { name, username, email, password } = req.body;
    const results = userJoi.validate({ name, username, email, password, ip }, { abortEarly: false });
    if (results.error) {
      return res.status(400).json(results.error.details);
    } else {
      next();
    }
  } catch (error) {
    console.log("error in register form validation middleware");
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const validateLoginForm = (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Invalid Login Request" });
    } else {
      next();
    }
  } catch (error) {
    console.log("error in login form validation middleware");
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const checkLogin = (req, res, next) => {
  if (req.cookies.auth_token) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

const isNotLoggedIn = (req, res, next) => {
  if (!req.cookies.auth_token) {
    next();
  } else {
    return res.status(200).json({ message: "Login Successful" });
  }
};

const setUser = async (req, res, next) => {
  try {
    if (req.cookies.auth_token) {
      const user = jwt.verify(req.cookies.auth_token, process.env.JWT_KEY);
      req.user = user;
      const userExists = await User.findById(req.user.user_id);
      if (userExists) next();
      else return res.clearCookie("auth_token").status(401).json({ message: "Invalid Token" });
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Invalid Auth Token" });
    } else {
      console.log("error in set user middleware");
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

const generateToken = (user) => {
  const token = jwt.sign(user, process.env.JWT_KEY, { expiresIn: "20m" });
  return token;
};

module.exports = { validateRegisterForm, validateLoginForm, checkLogin, isNotLoggedIn, setUser, generateToken };
