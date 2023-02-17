const passport = require('passport');

exports.sessionCreate = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            next(err);
        } else if (!user) {
            res.status(404).json({ message: info.message })
            // res.render('signin', { error: info.message })
        } else {
            req.login(user, (err) => {
                if (err) {
                    next(err)
                } else {
                    res.status(200).json({ message: 'vous êtes maintenant connecté' });
                }
            })
        }
    })(req, res, next);
};

exports.sessionDelete = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.end();
    });
};