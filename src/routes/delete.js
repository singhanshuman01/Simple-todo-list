const express = require('express');
const query = require('../db/query');

const router = express.Router();

function f1(req,res,next) {
    console.log("delete request recieved");
    next();
}

router.use(f1);

router.post('/', async(req,res)=>{
    const {deleteItemId} = req.body;
    console.log(deleteItemId);
    await query.deleteItem(deleteItemId);
    res.redirect('/');
})

module.exports = router;