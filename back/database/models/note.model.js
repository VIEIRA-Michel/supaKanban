const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String },
    userId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
});

const NoteModel = mongoose.model('notes', noteSchema);

module.exports = NoteModel;