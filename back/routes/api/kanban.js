const router = require('express').Router();
const KanbanModel = require('../../database/models/kanban.model');
const jsonwebtoken = require('jsonwebtoken');
const { keyPub } = require('../../keys');

router.post('/', async (req, res) => {
    const { title } = req.body;
    const { token } = req.cookies;
    const decodedToken = jsonwebtoken.verify(token, keyPub);
    const newKanban = new KanbanModel({ title, userId: decodedToken.sub });
    newKanban.save((err, data) => {
        if (err) {
            console.log(err);
            if (err.code === 11000) {
                res.status(400).json('Email déjà utilisé');
            } else {
                res.status(400).json('Oops une erreur est survenue');
            }
        } else {
            console.log(data);
            res.json(data);
        }
    })
})

router.get('/', async (req, res) => {
    const { token } = req.cookies;
    const decodedToken = jsonwebtoken.verify(token, keyPub);
    KanbanModel.find({ userId: decodedToken.sub })
        .then(data => res.status(200).json(data))
        .catch(error => res.status(400).json({ error }));
})

module.exports = router