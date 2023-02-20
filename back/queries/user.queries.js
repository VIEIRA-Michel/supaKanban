const User = require('../database/models/user.model');

exports.createUser = async (body) => {
    try {
        const { username, email, password } = body;
        const hashedPassword = await User.hashPassword(password);
        const user = new User({
            username: username,
            local: {
                email: email,
                password: hashedPassword
            }
        })
        return user.save();
    } catch (e) {
        throw e;
    }

}

exports.findUserPerEmail = (email) => {
    return User.findOne({ 'local.email': email }).exec();
}