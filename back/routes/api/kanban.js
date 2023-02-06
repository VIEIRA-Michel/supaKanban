const router = require('express').Router();
const KanbanModel = require('../../database/models/kanban.model');
const ListModel = require('../../database/models/list.model');
const UserModel = require('../../database/models/user.model');
const jsonwebtoken = require('jsonwebtoken');
const { keyPub } = require('../../keys');

router.post('/', async (req, res) => {
    const { title } = req.body;
    const { token } = req.cookies;
    const decodedToken = jsonwebtoken.verify(token, keyPub);
    const newKanban = new KanbanModel({ title, userId: decodedToken.sub });
    newKanban.save((err, data) => {
        if (err) {
            res.status(400).json('Oops une erreur est survenue');
        } else {
            UserModel.findOneAndUpdate({ _id: decodedToken.sub }, { $inc: { 'kanbanCreated': 1 } })
                .then(() => res.json(data))
                .catch((e) => res.status(400).json({ e }))
        }
    })
})

router.get('/', async (req, res) => {
    const { token } = req.cookies;
    const decodedToken = jsonwebtoken.verify(token, keyPub);
    KanbanModel.find({ userId: decodedToken.sub }).sort({ _id: -1 })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => res.status(400).json({ error }));
})

router.get('/:id', async (req, res) => {
    const { token } = req.cookies;
    console.log(req.params.id);
    const decodedToken = jsonwebtoken.verify(token, keyPub);
    ListModel.find({ kanbanId: req.params.id }).populate("kanbanId")
        .then(data => {
            if (data.length < 1) {
                res.status(200).json({ message: 'Aucune liste pour ce kanban !' });
            } else if (data[0].userId == decodedToken.sub) {
                res.status(200).json(data);
            } else {
                res.status(404).json({ message: 'Kanban non trouvé !' })
            }
        })
        .catch(error => res.status(400).json({ error }));
})


router.put('/:id', async (req, res) => {
    const { token } = req.cookies;
    const decodedToken = jsonwebtoken.verify(token, keyPub);
    KanbanModel.find({ _id: req.params.id })
        .then(data => {
            if (data[0].userId == decodedToken.sub) {
                KanbanModel.updateOne({ _id: req.params.id }, { title: req.body.title })
                    .then((result) => res.status(200).json({ result, message: 'Kanban modifié !' }))
                    .catch(error => res.status(400).json({ error }));
            } else {
                res.status(403).json({ message: "Vous n'avez pas la permission pour cette action !" })
            }
        })
        .catch(error => res.status(400).json({ error }));
})

router.delete('/:id', async (req, res) => {
    const { token } = req.cookies;
    const decodedToken = jsonwebtoken.verify(token, keyPub);
    KanbanModel.find({ _id: req.params.id })
        .then(data => {
            if (data && data[0].userId == decodedToken.sub) {
                KanbanModel.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Kanban supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            } else {
                res.status(404).json({ message: 'Kanban non trouvé !' })
            }
        })
        .catch(error => res.status(400).json({ error }));
})

module.exports = router