const mongoose = require('mongoose');

const kanbanSchema = mongoose.Schema({
    title: { type: String, required: true },
    // kanban: { type: Array, default: [] },
    userId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
});

const KanbanModel = mongoose.model('kanbans', kanbanSchema);

module.exports = KanbanModel;