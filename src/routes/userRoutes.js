const express = require('express');
const query = require('../db/query');

const authCheck = require('../middleware/authCheck');

const router = express.Router();
router.get("/", (req, res) => res.redirect('/home'));

router.get('/home',authCheck, async (req, res) => {
    const {id} = req;
    const items = await query.getList(id);
    // console.log(items);
    res.render('index.ejs', {
        listItems: items
    });
}).post('/home',authCheck, async (req, res) => {
    const { newItem, list } = req.body;
    const {id} = req;
    await query.addItem(newItem, list, id);
    res.redirect('/home');
})

router.post('/edit',authCheck, async (req, res) => {
    const { updatedItemId, updatedItemTitle, updatedItemTarg } = req.body;
    try {
        await query.updateList(updatedItemId, updatedItemTitle);
        res.redirect('/home');
    } catch (error) {
        res.json({ Error: "Error" });
    }
});

router.post('/delete',authCheck, async (req, res) => {
    const { deleteItemId } = req.body;
    await query.deleteItem(deleteItemId);
    res.redirect('/home');
});

module.exports = router;