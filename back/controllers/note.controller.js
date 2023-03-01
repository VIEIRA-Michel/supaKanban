const UserModel = require('../database/models/user.model');
const NoteModel = require('../database/models/note.model');

exports.createNote = async (req, res, next) => {
    try {
        const newNote = new NoteModel({ title: req.body.title, content: req.body.content, userId: req.user._id });
        newNote.save((err, data) => {
            if (err) {
                res.status(400).json('Oops une erreur est survenue');
            } else {
                UserModel.findOneAndUpdate({ _id: req.user._id }, { $inc: { 'noteCreated': 1 } })
                    .then(() => res.json(data))
                    .catch((e) => res.status(400).json({ e }))
            }
        })
    } catch (error) {
        res.status(400).json('Oops une erreur est survenue');
    }
}

exports.getAllNotes = async (req, res, next) => {
    try {
        NoteModel.find({ userId: req.user._id })
            .then((data) => res.json(data))
            .catch((e) => res.status(400).json({ e }))
    } catch (error) {
        res.status(400).json('Oops une erreur est survenue');
    }
}

exports.getOneNote = async (req, res, next) => {
    try {
        NoteModel.findOne({ _id: req.params.id })
            .then((data) => res.json(data))
            .catch((e) => res.status(400).json({ e }))
    } catch (error) {
        res.status(400).json('Oops une erreur est survenue');
    }
};

exports.updateNote = async (req, res, next) => {
    try {
        NoteModel.findOneAndUpdate({ _id: req.params.id }, { title: req.body.title, content: req.body.content })
            .then((data) => res.json(data))
            .catch((e) => res.status(400).json({ e }))
    } catch (error) {
        res.status(400).json('Oops une erreur est survenue');
    }
};

exports.deleteNote = async (req, res, next) => {
    try {
        NoteModel.findOneAndDelete({ _id: req.params.id })
            .then((data) => res.json(data))
            .catch((e) => res.status(400).json({ e }))
    } catch (error) {
        res.status(400).json('Oops une erreur est survenue');
    }
};