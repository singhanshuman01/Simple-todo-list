const session = require('../utils/session');

const authCheck = function(req,res,next){
    try {
        const uid = req.cookies.uid;
        if(!uid) return res.redirect('/login');
        const user_id = session[uid];
        if(!user_id){
            return res.redirect('/login');
        }
        req.id = user_id;
        return next();
    } catch (err) {
        console.error(err);
        return next(err);
    }
}

module.exports = authCheck;