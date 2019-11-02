const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');

const app = express();
const apiRouter = express.Router();

app.use('/api', apiRouter);
app.use(cors({ credentials: true }));
app.use(errors());

module.exports = app;
