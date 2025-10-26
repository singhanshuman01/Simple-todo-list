const dbQuery = require('../config/db');

const addUser = async function(username, password){
    try {
        const result = await dbQuery.query("insert into users(username, password) values($1,$2) returning id",[username,password]);
        // console.log(id);
        return result.rows.id;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const checkUser = async function(username){
    try {
        const result = await dbQuery.query("select * from users where username = $1",[username]);
        if(result.rowCount>0){
            console.log(result.rowCount);
            console.log(result.rows[0]);
            return result.rows[0];
        }else{
            return null;
        }
    } catch (error) {
        console.error(error);
    }
}

const getList = async function(user_id){
    try {
        
    const result = await dbQuery.query("select * from items where user_id=$1",[user_id]);
    return result.rows;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const updateList = async (id,text) => {
    try {
        
        await dbQuery.query("update items set title = $1 where id = $2",[text,id]);
    } catch (error) {
        console.error(error);
    }
}

const addItem = async (text, targ,user_id) => {
    try {        
        await dbQuery.query("insert into items(title,target,user_id) values($1,$2, $3)",[text, targ,user_id]);
    } catch (error) {
        console.error(error);
    }
}

const deleteItem = async (id) => {
    try {
        
        await dbQuery.query("delete from items where id = $1",[id]);
    } catch (error) {
        console.error(error);
    }
}

module.exports = {addUser, checkUser, getList, updateList, addItem, deleteItem};