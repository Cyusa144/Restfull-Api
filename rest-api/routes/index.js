const express = require('express');
const articleRoutes = require("./article")
const userRoutes = require("./user")

const app = express();

app.use('/article', articleRoutes);
app.use('/user', userRoutes);

module.exports = app;