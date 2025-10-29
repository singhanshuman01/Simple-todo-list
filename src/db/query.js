const dbQuery = require('../config/db');

const addUser = async function(username, password, email){
    try {
        const result = await dbQuery.query("insert into users(username, password, email) values($1,$2,$3) returning id",[username,password, email]);
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
        
    const result = await dbQuery.query("select * from items where user_id=$1 order by target",[user_id]);
    return result.rows;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const updateList = async (id,text,targ) => {
    try {
        
        await dbQuery.query("update items set title = $1,target=$2 where id = $3",[text,targ,id]);
    } catch (error) {
        console.error(error);
    }
}

const addItem = async (text, targ,user_id) => {
    try {        
        const id = await dbQuery.query("insert into items(title,target,user_id) values($1,$2, $3) returning id",[text, targ,user_id]);
        return id.rows[0].id;
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