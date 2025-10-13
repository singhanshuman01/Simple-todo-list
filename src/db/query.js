const dbQuery = require('../config/db');

const getList = async function(){
    const result = await dbQuery.query("select * from items");
    return result.rows;
}

const updateList = async (id,text) => {
    await dbQuery.query("update items set title = $1 where id = $2",[text,id]);
}

const addItem = async (text) => {
    await dbQuery.query("insert into items(title) values($1)",[text]);
}

const deleteItem = async (id) => {
    await dbQuery.query("delete from items where id = $1",[id]);
}

module.exports = {getList, updateList, addItem, deleteItem};