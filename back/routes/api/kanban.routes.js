const router = require('express').Router();
const { getAllKanbans, createKanban, getKanbanById, updateKanban, deleteKanban } = require('../../controllers/kanban.controller');

router.get('/', getAllKanbans);
router.post('/new', createKanban);
router.get('/:id', getKanbanById);
router.put('/:id', updateKanban);
router.delete('/:id', deleteKanban)

module.exports = router