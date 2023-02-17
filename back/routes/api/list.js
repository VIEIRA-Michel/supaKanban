const router = require('express').Router();
const ListModel = require('../../database/models/list.model');
const UserModel = require('../../database/models/user.model');
const jsonwebtoken = require('jsonwebtoken');
const { keyPub } = require('../../keys');

router.post('/new', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
    const { token } = req.cookies;
    const decodedToken = jsonwebtoken.verify(token, keyPub);
    ListModel.findOneAndDelete({ _id: req.params.id, userId: decodedToken.sub })
        .then((data) => {
            res.status(200).json({ message: 'Liste supprimée' })
        })
        .catch(error => res.status(400).json({ error }));
});

router.put('/:id', async (req, res) => {
    const { token } = req.cookies;
    const decodedToken = jsonwebtoken.verify(token, keyPub);
    ListModel.findOneAndUpdate({ _id: req.params.id, userId: decodedToken.sub }, { title: req.body.title })
        .then((result) => res.status(200).json({ result, message: 'Liste modifiée !' }))
        .catch(error => res.status(400).json({ error }));
});

module.exports = router;