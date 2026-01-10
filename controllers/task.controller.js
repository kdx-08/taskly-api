const mongoose = require("mongoose");
const { Task } = require("../models/Task.js");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user_id: req.user.user_id });
    return res.status(200).json(tasks);
  } catch (error) {
    console.log("error in get all tasks route");
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, status = "in progress", user_id = req.user.user_id } = req.body;
    await Task.create({ title, description, status, user_id });
    res.status(201).redirect("/tasks");
  } catch (error) {
    console.log("error in create task route");
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

const getTask = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send("Invalid Task ID");
    } else {
      const task = await Task.findById(id);
      if (task) {
        if (task.user_id.equals(req.user.user_id)) {
          return res.status(200).json(task);
        } else {
          return res.status(403).send("Forbidden");
        }
      }
      return res.status(404).send("Task Not Found");
    }
  } catch (error) {
    console.log("error in get task route");
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

const updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send("Invalid Task ID");
    } else {
      const task = await Task.findById(id);
      if (task) {
        if (task.user_id.equals(req.user.user_id)) {
          const { title, description, status } = req.body;
          await Task.findByIdAndUpdate(id, { title, description, status });
          return res.status(200).redirect(`/tasks/${id}`);
        } else {
          return res.status(403).send("Forbidden");
        }
      }
      return res.status(404).send("Task Not Found");
    }
  } catch (error) {
    console.log("error in get task route");
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send("Invalid Task ID");
    } else {
      const task = await Task.findById(id);
      if (task) {
        if (task.user_id.equals(req.user.user_id)) {
          await Task.findByIdAndDelete(id);
          return res.status(200).send("Task Deleted Successfully");
        } else {
          return res.status(403).send("Forbidden");
        }
      }
      return res.status(404).send("Task Not Found");
    }
  } catch (error) {
    console.log("error in get task route");
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
