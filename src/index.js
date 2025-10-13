const express = require('express');
const logger = require('./middleware/logger');
const bodyParser = require('body-parser');
require('dotenv').config();

const readRoute = require('./routes/read');
const createRoute = require('./routes/create');
const deleteRoute = require('./routes/delete');
const updateRoute = require('./routes/update');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(logger);
app.use(express.static('public/'));

app.use('/', readRoute);
app.use('/delete', deleteRoute);
app.use('/edit', updateRoute);
app.use('/add', createRoute);

module.exports = app;
