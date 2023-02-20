const { createUser } = require('../queries/user.queries');
const UserModel = require('../database/models/user.model');

exports.userCreate = async (req, res, next) => {
    try {
        const body = req.body;
        const user = await createUser(body);
        req.login(user, (err) => {
            if (err) { next(err) }
            delete user.password;
            res.status(200).json(user);
        })
    } catch (e) {
        res.status(400).json({ message: 'Un compte existe déjà avec cette adresse email' });
    }
}

exports.updatePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    UserModel.findOne({ _id: req.user._id })
        .then((user) => {
            bcrypt.compare(oldPassword, user.password)
                .then(async (valid) => {
                    if (!valid) {
                        res.status(400).json('Mot de passe incorrect');
                    } else {
                        user.password = await hashPassword(newPassword);
                        user.save();
                        res.status(200).json('Mot de passe modifié');
                    }
                })
                .catch((e) => res.status(400).json({ e }))
        })
        .catch((e) => res.status(400).json({ e }))
}