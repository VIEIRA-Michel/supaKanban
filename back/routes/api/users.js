const router = require('express').Router();
const UserModel = require('../../database/models/user.model');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    const { username, email, password } = req.body;
    const newUser = new UserModel({
        username,
        email,
        password: await bcrypt.hash(password, 8),
    });
    newUser.save((err, user) => {
        if (err) {
            console.log(err);
            if (err.code === 11000) {
                res.status(400).json('Email déjà utilisé');
            } else {
                res.status(400).json('Oops une erreur est survenue');
            }
        } else {
            console.log(user);
            res.json(user);
        }
    })
})

module.exports = router