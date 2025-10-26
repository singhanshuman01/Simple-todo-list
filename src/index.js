const express = require('express');
const logger = require('./middleware/logger');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();


app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(logger);
app.use(cookieParser());
app.use(express.static('public/'));


app.use('/', authRoutes);
app.use('/', userRoutes);
// app.use('/',(req,res)=>res.sendStatus(404).json({error: "Not found"}));

module.exports = app;
