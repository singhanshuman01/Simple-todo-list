const express = require('express');
const controller = require('../controller/authController');
// const authCheck = require('../middleware/authCheck');
const router = express.Router();

router.get('/signup',(req, res) => {
    res.render("signup.ejs");
}).post('/signup', controller.signUp);

router.get('/login',(req,res)=>{
    res.render("login.ejs")
}).post('/login', controller.login);

router.post('/logout', controller.logout);

module.exports = router;