const mongoose = require('mongoose');

const kanbanSchema = mongoose.Schema({
    title: { type: String, required: true },
    kanban: { type: Array, default: [] },
    userId: { type: String, required: true }
});

const KanbanModel = mongoose.model('kanban', kanbanSchema);

module.exports = KanbanModel;