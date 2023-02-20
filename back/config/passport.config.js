const passport = require('passport');
const { app } = require('../app');
const User = require('../database/models/user.model');
const LocalStrategy = require('passport-local').Strategy;
const { findUserPerEmail } = require('../queries/user.queries');


app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id).exec();
        done(null, user);
    } catch (e) {
        done(e, null);
    }
});

passport.use(
    'local',
    new LocalStrategy(
        { usernameField: 'email' },
        async (email, password, done) => {
            try {
                const user = await findUserPerEmail(email);
                if (user) {
                    const match = await user.comparePassword(password);
                    if (match) {
                        done(null, user);
                    } else {
                        done(null, false, { message: "Mauvais mot de passe" });
                    }
                } else {
                    done(null, false, { message: 'Ce compte n\'existe pas' });
                }
            } catch (e) {
                done(e);
            }
        }
    )
);