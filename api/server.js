const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const jwt = require("jsonwebtoken");

const authenticate = require("../auth/authenticate-middleware.js");
const authRouter = require("../auth/auth-router.js");
const jokesRouter = require("../jokes/jokes-router.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/jokes", authenticate, jokesRouter);

server.get("/", (req, res) => {
  res.send("It's alive!");
});

// server.get("/token", (req, res) => {
//   const payload = {
//     subject: "thisuser",
//     userid: "user1"
//   };

//   const secret = "devotionsc";
//   const options = {
//     expiresIn: "1h"
//   };

//   const token = jwt.sign(payload, secret, options);

//   res.json(token);
// });

module.exports = server;
