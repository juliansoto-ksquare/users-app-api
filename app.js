const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const apiRoutes = require('./Routes');

app.use(bodyparser.json());
app.use('/api', apiRoutes);

module.exports = app;