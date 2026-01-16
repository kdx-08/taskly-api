const express = require("express");
const {
  validateRegisterForm,
  validateLoginForm,
  isNotLoggedIn,
  checkLogin,
  setUser,
} = require("../middlewares/auth.middleware.js");
const {
  registerRoute,
  loginRoute,
  logoutRoute,
  getAccountData,
  deleteAccount,
} = require("../controllers/auth.controller.js");

const router = express.Router();

router.post("/register", isNotLoggedIn, validateRegisterForm, registerRoute);
router.post("/login", isNotLoggedIn, validateLoginForm, loginRoute);
router.get("/logout", logoutRoute);
router.get("/profile", checkLogin, setUser, getAccountData);
router.delete("/delete", checkLogin, setUser, deleteAccount);

module.exports = router;
