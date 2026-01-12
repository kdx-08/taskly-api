const express = require("express");
const { validateRegisterForm, validateLoginForm, isNotLoggedIn } = require("../middlewares/auth.middleware.js");
const { registerRoute, loginRoute, logoutRoute } = require("../controllers/auth.controller.js");

const router = express.Router();

router.post("/register", isNotLoggedIn, validateRegisterForm, registerRoute);
router.post("/login", isNotLoggedIn, validateLoginForm, loginRoute);
router.get("/logout", logoutRoute);

module.exports = router;
