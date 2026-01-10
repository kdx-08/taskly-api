const mongoose = require("mongoose");
const joi = require("joi");

const userJoi = joi.object({
  name: joi
    .string()
    .trim()
    .min(3)
    .max(25)
    .pattern(/^[a-zA-Z\s]+$/)
    .required(),
  username: joi.string().trim().min(3).max(30).alphanum().required(),
  email: joi.string().trim().email().max(100).required(),
  password: joi.string().min(8).max(100).required(),
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = { userJoi, User };
