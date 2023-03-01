const router = require('express').Router();
const { createNote, getAllNotes, getOneNote, updateNote, deleteNote } = require('../../controllers/note.controller');

router.get('/', getAllNotes);
router.post('/new', createNote);
router.get('/:id', getOneNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

module.exports = router
