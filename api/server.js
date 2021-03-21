const express = require("express");
const server = express();

const actionsRouter = require("./actions/actions-router.js");
const projectsRouter = require("./projects/projects-router.js");

const helmet = require("helmet");
// Complete your server here!
// Do NOT `server.listen()` inside this file!

server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectsRouter);

server.use("/", (req, res) => {
  res.status(200).send(`<h5>i'm working!</h5>`);
});

server.use((error, req, res, next) => {
  error.error && console.error(error.error);
  res.status(error.status).json({ message: error.message });
});

module.exports = server;
