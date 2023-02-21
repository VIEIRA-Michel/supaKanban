const router = require('express').Router();
const { createTask, deleteTask, updateTask } = require('../../controllers/task.controller');

router.post('/new', createTask);
router.delete('/:id', deleteTask);
router.put('/:id', updateTask);

module.exports = router
