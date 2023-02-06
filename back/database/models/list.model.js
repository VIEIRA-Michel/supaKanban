const mongoose = require('mongoose');


const listSchema = mongoose.Schema({
    title: { type: String, required: true },
    tasks: { type: Array, default: [] },
    userId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    kanbanId: { type: mongoose.Types.ObjectId, ref: 'kanbans' },
});

const ListModel = mongoose.model('lists', listSchema);

module.exports = ListModel;