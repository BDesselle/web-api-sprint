const express = require("express");
const morgan = require("morgan");
const app = express();
const projectRouter = require("./routes/projectRouter");
const actionRouter = require("./routes/actionRouter");

app.use(express.json());
app.use(morgan("dev"));

//* ROUTES
app.use("/api/projects", projectRouter);
app.use("/api/actions", actionRouter);

//* WELCOME
app.get("/", (req, res) => {
  res.send("Let's write some middleware!");
});

//* 404 FALLBACK
app.use(function(req, res) {
  res.status(404).send("😿 RIP this endpoint 😿");
});

module.exports = app;
