const express = require('express');
const query = require('../db/query');

const router = express.Router();
const targ = ["Today","Tomorrow","This Week"];

router.get('/', async (req,res)=>{
    const items = await query.getList();
    res.render('index.ejs',{
        listTitle: targ,
        listItems: items
    });
})

module.exports = router;