const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./v1/config/db.js");
const authRoutes = require("./v1/routes/auth.route.js");
const taskRoutes = require("./v1/routes/task.route.js");

const app = express();
const port = process.env.PORT || 3001;

app.enable("trust proxy");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connectDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Hello from Taskly API!" });
});

app.all(/.*/, (req, res) => {
  return res.status(404).json({ message: `Cannot ${req.method} ${req.url}` });
});

app.listen(port, () => {
  console.log("server is running at port", port);
});
