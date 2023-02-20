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
                    // const dataFromUser = {
                    //     _id: user._id,
                    //     email: user.email,
                    //     username: user.username,
                    //     kanbanCreated: user.kanbanCreated,
                    //     listCreated: user.listCreated,
                    //     taskCreated: user.taskCreated,
                    //     createdAt: user.createdAt
                    // };
                    // res.status(200).json(user);
                    // next();
                    // res.end();
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