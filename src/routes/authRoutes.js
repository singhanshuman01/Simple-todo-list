const express = require('express');
const controller = require('../controller/authController');
const isLoggedIn = require('../middleware/isLoggedIn');
const limiter = require('../middleware/rateLimiter');
const router = express.Router();

router.use(limiter);

router.get('/signup',isLoggedIn, (req, res) => {
    res.render("signup.ejs");
}).post('/signup', controller.signUp);

router.get('/login', isLoggedIn, (req,res)=>{
    res.render("login.ejs")
}).post('/login', controller.login);

router.post('/logout', controller.logout);

module.exports = router;