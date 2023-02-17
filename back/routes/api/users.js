const router = require('express').Router();
const UserModel = require('../../database/models/user.model');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const { keyPub } = require('../../keys');

router.post('/new', async (req, res) => {
    // const { username, email, password } = req.body;
    // const newUser = new UserModel({
    //     username,
    //     email,
    //     password: await bcrypt.hash(password, 8),
    // });
    // newUser.save((err, user) => {
    //     if (err) {
    //         console.log(err);
    //         if (err.code === 11000) {
    //             res.status(400).json('Email déjà utilisé');
    //         } else {
    //             res.status(400).json('Oops une erreur est survenue');
    //         }
    //     } else {
    //         console.log(user);
    //         res.json(user);
    //     }
    // })
})

router.put('/changePassword', async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const { token } = req.cookies;
    const decodedToken = jsonwebtoken.verify(token, keyPub);
    UserModel.findOne({ _id: decodedToken.sub })
        .then((user) => {
            bcrypt.compare(oldPassword, user.password)
                .then(async (valid) => {
                    if (!valid) {
                        res.status(400).json('Mot de passe incorrect');
                    } else {
                        user.password = await bcrypt.hash(newPassword, 8);
                        user.save();
                        res.status(200).json('Mot de passe modifié');
                    }
                })
                .catch((e) => res.status(400).json({ e }))
        })
        .catch((e) => res.status(400).json({ e }))
});


module.exports = router