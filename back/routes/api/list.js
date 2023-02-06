const router = require('express').Router();
const ListModel = require('../../database/models/list.model');
const UserModel = require('../../database/models/user.model');
const jsonwebtoken = require('jsonwebtoken');
const { keyPub } = require('../../keys');

router.post('/', async (req, res) => {
    const { title, id } = req.body;
    const { token } = req.cookies;
    const decodedToken = jsonwebtoken.verify(token, keyPub);
    const newList = new ListModel({ title, userId: decodedToken.sub, kanbanId: id });
    newList.save((err, data) => {
        if (err) {
            res.status(400).json('Oops une erreur est survenue');
        } else {
            UserModel.findOneAndUpdate({ _id: decodedToken.sub }, { $inc: { 'listCreated': 1 } })
                .then(() => res.json(data))
                .catch((e) => res.status(400).json({ e }))
        }
    })
});


module.exports = router;