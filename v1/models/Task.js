const mongoose = require("mongoose");
const joi = require("joi");

const taskJoi = joi.object({
  title: joi.string().trim().min(3).max(50).required(),
  description: joi.string().trim().min(3).max(100).required(),
  status: joi.string().trim().valid("in progress", "completed", "dropped").required(),
  user_id: joi.string().trim().required(),
  ip: joi.string().required(),
});

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
    },
    description: {
      type: String,
      required: true,
      minlength: 3,
    },
    status: {
      type: String,
      enum: ["in progress", "completed", "dropped"],
      default: "in progress",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    ip: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = { taskJoi, Task };
