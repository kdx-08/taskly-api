const { taskJoi } = require("../models/Task.js");

const validateTask = (req, res, next) => {
  const ip = req.ip;
  try {
    const { title, description, status = "in progress", user_id = req.user.user_id } = req.body;
    const results = taskJoi.validate({ title, description, status, user_id, ip });
    if (results.error) {
      return res.status(400).json(results.error.details);
    } else {
      next();
    }
  } catch (error) {
    console.log("error in validate task middleware");
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { validateTask };
