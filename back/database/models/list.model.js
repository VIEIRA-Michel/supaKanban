const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    userId: { type: String, required: true },
    content: { type: String, required: true },
    index: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now() },
});


const listSchema = mongoose.Schema({
    title: { type: String, required: true },
    tasks: { type: [taskSchema], default: [] },
    userId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    kanbanId: { type: mongoose.Types.ObjectId, ref: 'kanbans' },
});

const ListModel = mongoose.model('lists', listSchema);

module.exports = ListModel;