const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/auth.route.js");
const taskRoutes = require("./routes/task.route.js");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());
connectDB();

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.get("/", (req, res) => {
  console.log(req.cookies.token);
  return res.send(`Hello from application!`);
});

app.listen(port, () => {
  console.log("server is running at port", port);
});
