const passport = require('passport');

exports.sessionCreate = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            next(err);
        } else if (!user) {
            res.status(404).json(info);
        } else {
            req.login(user, (err) => {
                if (err) {
                    next(err)
                } else {
                    res.status(200).json(user);
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


exports.checkAuthentication = (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: "success user",
            user: req.user,
        });
    } else {
        req.status(404).json({
            success: false,
            message: "No user",
        })
    }
}