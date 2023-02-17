const passport = require('passport');
const { app } = require('../index');
const UserModel = require('../database/models/user.model');
const LocalStrategy = require('passport-local').Strategy;

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user._id);
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await UserModel.findById(id).exec();
        done(null, user);
    } catch (e) {
        done(e, null);
    }
});

passport.use('local', new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
        const user = await UserModel.findOne({ 'email': email }).exec();
        if (user) {
            const match = await user.comparePassword(password);
            if (match) {
                done(null, user);
            } else {
                done(null, false, { message: 'Mauvais mot de passe' });
            }
        } else {
            done(null, false, { message: 'Utilisateur non trouvé' });
        }
    } catch (e) {
        done(e);
    }
}));