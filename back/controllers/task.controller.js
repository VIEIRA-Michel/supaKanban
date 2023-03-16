const ListModel = require('../database/models/list.model');
const UserModel = require('../database/models/user.model');

exports.createTask = (req, res) => {
    ListModel.findOne({ _id: req.body.id, userId: req.user._id })
        .then((list) => {
            list.tasks.map((task, index) => {
                task.index = index + 1;
                return task;
            })
            list.tasks.unshift({
                userId: req.user._id,
                content: req.body.content,
                index: 0,
            })
            list.save();
            UserModel.findOneAndUpdate({ _id: req.user._id }, { $inc: { 'taskCreated': 1 }, lastTaskCreated: Date.now() })
                .then(() => res.status(201).json({ list, message: 'Tâche ajoutée !' }))
                .catch((e) => res.status(400).json({ e }))
        })
        .catch((e) => res.status(400).json({ e }))
};

exports.deleteTask = (req, res) => {
    const listId = req.baseUrl.split('/')[5];
    ListModel.findOneAndUpdate({ _id: listId, userId: req.user._id }, { $pull: { tasks: { _id: req.params.id } } })
        .then(() => {
            res.status(200).json({ message: 'Tâche supprimée' })
        })
        .catch(error => res.status(400).json({ error }));
};

exports.updateTask = (req, res) => {
    const listId = req.baseUrl.split('/')[5];
    const { content } = req.body;
    ListModel.findOne({ _id: listId, userId: req.user._id })
        .then((list) => {
            const task = list.tasks.id(req.params.id);
            task.content = content;
            list.save();
            res.status(200).json({ list, message: 'Liste modifiée !' })
        })
        .catch(error => res.status(400).json({ error }));
}