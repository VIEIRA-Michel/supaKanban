const router = require('express').Router();
const ListModel = require('../../database/models/list.model');
const UserModel = require('../../database/models/user.model');
const jsonwebtoken = require('jsonwebtoken');
const { keyPub } = require('../../keys');

router.post('/', async (req, res) => {
    const { token } = req.cookies;
    const decodedToken = jsonwebtoken.verify(token, keyPub);
    ListModel.findOne({ _id: req.body.id, userId: decodedToken.sub })
        .then((list) => {
            list.tasks.map((task, index) => {
                task.index = index + 1;
                return task;
            })
            list.tasks.unshift({
                userId: decodedToken.sub,
                content: req.body.content,
                index: 0,
            })
            list.save();
            res.status(201).json({ list, message: 'Tâche ajoutée !' })
        })
        .catch((e) => res.status(400).json({ e }))
});


router.delete('/:id', async (req, res) => {
    const { token } = req.cookies;
    const decodedToken = jsonwebtoken.verify(token, keyPub);
    const listId = req.baseUrl.split('/')[5];
    ListModel.findOneAndUpdate({ _id: listId, userId: decodedToken.sub }, { $pull: { tasks: { _id: req.params.id } } })
        .then(() => {
            res.status(200).json({ message: 'Tâche supprimée' })
        })
        .catch(error => res.status(400).json({ error }));
});

module.exports = router
