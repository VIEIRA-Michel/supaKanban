const ListModel = require('../database/models/list.model');

exports.createList = (req, res) => {
    const { title, id } = req.body;
    const newList = new ListModel({ title, userId: req.user._id, kanbanId: id });
    newList.save((err, data) => {
        if (err) {
            res.status(400).json('Oops une erreur est survenue');
        } else {
            UserModel.findOneAndUpdate({ _id: req.user._id }, { $inc: { 'listCreated': 1 } })
                .then(() => res.json(data))
                .catch((e) => res.status(400).json({ e }))
        }
    })
}

exports.updateList = (req, res) => {
    ListModel.findOneAndUpdate({ _id: req.params.id, userId: req.user._id }, { title: req.body.title })
        .then((result) => res.status(200).json({ result, message: 'Liste modifiée !' }))
        .catch(error => res.status(400).json({ error }));
}

exports.deleteList = (req, res) => {
    ListModel.findOneAndDelete({ _id: req.params.id, userId: req.user._id })
        .then(() => {
            res.status(200).json({ message: 'Liste supprimée' })
        })
        .catch(error => res.status(400).json({ error }));
}
