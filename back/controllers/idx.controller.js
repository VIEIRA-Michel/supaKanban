const ListModel = require('../database/models/list.model');

exports.updateTaskIndex = (req, res) => {
    const { source, draggableId, destination } = req.body;
    if (source.droppableId !== destination.droppableId) {
        ListModel.findOne({ _id: source.droppableId, userId: req.user._id })
            .then((list) => {
                const taskRemoved = list.tasks.id(draggableId);
                taskRemoved.remove();
                list.tasks.map((task, index) => {
                    task.index = index;
                    return task;
                })
                list.save();
                ListModel.findOne({ _id: destination.droppableId, userId: req.user._id })
                    .then((list2) => {
                        list2.tasks.splice(destination.index, 0, taskRemoved);
                        list2.tasks.map((task, index) => {
                            task.index = index;
                            return task;
                        });
                        list2.save();
                        res.status(200).json({ sourceTask: list, destinationTask: list2, message: 'Liste modifiée !' })
                    })
                    .catch(error => res.status(400).json({ error }))
            })
            .catch(error => {
                console.log(error);
                res.status(400).json({ error })
            });
    } else {
        ListModel.findOne({ _id: source.droppableId, userId: req.user._id })
            .then((list) => {
                const [removed] = list.tasks.splice(source.index, 1);
                list.tasks.splice(destination.index, 0, removed);
                list.tasks.splice()
                list.tasks.map((task, index) => {
                    task.index = index;
                    return task;
                })
                list.save();
                res.status(200).json({ list, message: 'Liste modifiée !' })
            })
            .catch(error => {
                console.log(error);
                res.status(400).json({ error })
            });
    }
}