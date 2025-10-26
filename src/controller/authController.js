const db = require('../db/query');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const session = require('../utils/session');

const signUp = async function(req,res){
    const {username, password} = req.body;
    try{
        const user = await db.checkUser(username);
        console.log("user: ",user);
        if(user){
            res.json({"Error":"User already exists"});
        }else{
            const hash = bcrypt.hashSync(password,10);
            const result = await db.addUser(username,hash);
            if(result){
                const uid = crypto.randomBytes(16).toString('hex');
                session[uid] = result;
                res.cookie("uid",uid,{
                    httpOnly: true,
                    maxAge: 1000*60*60
                });
                res.redirect('/');

            }else{
                res.json({"Error":"DB error"});
            }
        }
    }
    catch(err){
        console.error(err);
        res.json({"Error":"Internal Server Error"});
    }
}
const login = async function(req,res){
    const {username, password} = req.body;
    try {
        const result = await db.checkUser(username);
        if(!result){
            res.json({"Error":"User doesn't exist"});
        }else{
            const passCheck = bcrypt.compare(password, result.password);
            if(passCheck){
                const uid = crypto.randomBytes(16).toString('hex');
                session[uid] = result.id;
                res.cookie("uid",uid,{
                    httpOnly: true,
                    maxAge: 1000*60*60
                });
                res.redirect('/');
            } else {
                res.json({"Error":"Wrong Credentials"});
            }
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500).json({"Error":"Internal Error"});
    }
}

const logout = function(req,res){
    try {
        const uid = req.cookies.uid;
        delete session[uid];
        res.clearCookie("uid");
        res.redirect('/login');
    } catch (error) {
        console.error(error);
    }
}

module.exports = {signUp, login, logout};