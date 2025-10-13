const express = require('express');
const query = require('../db/query');

const router = express.Router();

router.post('/', async(req,res)=>{
    const {newItem} = req.body;
    await query.addItem(newItem);
    res.redirect('/');
})

module.exports = router;