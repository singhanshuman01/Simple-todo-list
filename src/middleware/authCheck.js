const session = require('../utils/session');

const authCheck = function (req, res, next) {
    try {
        const uid = req.cookies.uid;
        if (!uid || !session[uid]) {
            return res.redirect('/login');
        }
        req.id = session[uid];
        return next();

    } catch (err) {
        console.error(err);
        return next(err);
    }
}

module.exports = authCheck;