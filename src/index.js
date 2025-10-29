const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cron = require('node-cron');
require('dotenv').config();

const logger = require('./middleware/logger');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const emailer = require('./services/emailer');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(logger);
app.use(cookieParser());
app.use(express.static('public/'));

cron.schedule('0 18 * * *', emailer);

app.use('/', authRoutes);
app.use('/', userRoutes);
app.use((req, res) => {
    res.status(404).send('Page not found');
});

module.exports = app;
