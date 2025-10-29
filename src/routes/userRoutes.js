const express = require('express');
const query = require('../db/query');

const authCheck = require('../middleware/authCheck');

const router = express.Router();
router.get("/", (req, res) => res.redirect('/home'));

router.get('/home',authCheck, async (req, res) => {
    const {id} = req;
    const items = await query.getList(id);
    res.render('index.ejs', {
        listItems: items
    });
});

module.exports = router;