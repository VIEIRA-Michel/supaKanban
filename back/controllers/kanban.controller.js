const KanbanModel = require('../database/models/kanban.model');
const ListModel = require('../database/models/list.model');
const UserModel = require('../database/models/user.model');


exports.getAllKanbans = (req, res) => {
    if (req.user._id) {
        KanbanModel.find({ userId: req.user._id }).sort({ _id: -1 })
            .then(data => {
                res.status(200).json(data);
            })
            .catch(error => res.status(400).json({ error }));
    }
};

exports.createKanban = (req, res) => {
    const newKanban = new KanbanModel({ title: req.body.title, userId: req.user._id });
    newKanban.save((err, data) => {
        if (err) {
            res.status(400).json('Oops une erreur est survenue');
        } else {
            UserModel.findOneAndUpdate({ _id: req.user._id }, { $inc: { 'kanbanCreated': 1 } })
                .then(() => res.json(data))
                .catch((e) => res.status(400).json({ e }))
        }
    })
};

exports.getKanbanById = (req, res) => {
    ListModel.find({ kanbanId: req.params.id }).populate("kanbanId")
        .then(data => {
            if (data.length < 1) {
                res.status(200).json({ message: 'Aucune liste pour ce kanban !' });
            } else if (data[0].userId == req.user._id) {
                res.status(200).json(data);
            } else {
                res.status(404).json({ message: 'Kanban non trouvé !' })
            }
        })
        .catch(error => res.status(400).json({ error }));
};

exports.updateKanban = (req, res) => {
    KanbanModel.find({ _id: req.params.id })
        .then(data => {
            if (data[0].userId == req.user._id) {
                KanbanModel.updateOne({ _id: req.params.id }, { title: req.body.title })
                    .then((result) => res.status(200).json({ result, message: 'Kanban modifié !' }))
                    .catch(error => res.status(400).json({ error }));
            } else {
                res.status(403).json({ message: "Vous n'avez pas la permission pour cette action !" })
            }
        })
        .catch(error => res.status(400).json({ error }));
};

exports.deleteKanban = (req, res) => {
    KanbanModel.find({ _id: req.params.id })
        .then(data => {
            if (data && data[0].userId == req.user._id) {
                KanbanModel.deleteOne({ _id: req.params.id })
                    .then(() => {
                        ListModel.deleteMany({ kanbanId: req.params.id })
                            .then(() => res.status(200).json({ message: 'Kanban supprimé !' }))
                            .catch(error => res.status(400).json({ error }));
                    })
                    .catch(error => res.status(400).json({ error }));
            } else {
                res.status(404).json({ message: 'Kanban non trouvé !' })
            }
        })
        .catch(error => res.status(400).json({ error }));
}