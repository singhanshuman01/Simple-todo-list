const session = require('../utils/session');

const isLoggedIn = function (req, res,next) {
    try {
        const { uid } = req.cookies;
        if (!uid || !session[uid]) return next();
        return res.redirect('/home');
    } catch (error) {
        console.error(error);
        res.clearCookie('uid');
        return next(error);
    }

}

module.exports = isLoggedIn;