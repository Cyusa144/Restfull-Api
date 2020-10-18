const express = require('express');
const articleRoutes = require("./article")

const app = express();

app.use('/article', articleRoutes);

module.exports = app;