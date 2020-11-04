const express = require('express');
const articleRoutes = require("./article")
const contactRoutes = require("./contact")
const userRoutes = require("./user")

const app = express();

app.use('/article', articleRoutes);
app.use('/contact', contactRoutes);
app.use('/user', userRoutes);

module.exports = app;