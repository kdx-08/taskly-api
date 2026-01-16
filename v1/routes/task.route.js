const express = require("express");
const { setUser } = require("../middlewares/auth.middleware.js");
const { getAllTasks, createTask, getTask, updateTask, deleteTask } = require("../controllers/task.controller.js");
const { validateTask } = require("../middlewares/task.middleware.js");

const router = express.Router();

router.get("/", setUser, getAllTasks);
router.post("/", setUser, validateTask, createTask);
router.get("/:id", setUser, getTask);
router.patch("/:id", setUser, updateTask);
router.delete("/:id", setUser, deleteTask);

module.exports = router;
