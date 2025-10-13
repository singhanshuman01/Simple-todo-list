const express = require('express');
const query = require('../db/query');
// const ejs = require('ejs');

const router = express.Router();

router.get('/', async (req,res)=>{
    const items = await query.getList();
    res.render('index.ejs',{
        listTitle: "Today",
        listItems: items
    });
})

module.exports = router;