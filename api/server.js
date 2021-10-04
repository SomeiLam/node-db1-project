const express = require("express");
const { logger, errorHandling } = require('./general-middleware');
const AccountRouter = require("./accounts/accounts-router.js");
const server = express();

server.use(express.json());
server.use("/api/accounts", AccountRouter);

server.get('/', logger, (req, res) => {
    res.send(`<h2>Account API<h2>`);
});

server.use(errorHandling);

module.exports = server;
