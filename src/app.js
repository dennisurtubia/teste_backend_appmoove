const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes');

const app = express();

app.use('/api', apiRouter);
app.use(cors({ credentials: true }));

module.exports = app;
