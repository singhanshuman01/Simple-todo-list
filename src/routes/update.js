const express = require('express');
const query = require('../db/query');
// const ejs = require('ejs');

const router = express.Router();

router.post('/', async(req,res)=>{
    const {updatedItemId, updatedItemTitle} = req.body;
    await query.updateList(updatedItemId,updatedItemTitle);
    res.redirect('/');
})

module.exports = router;