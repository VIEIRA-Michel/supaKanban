const router = require('express').Router();
const { createList, deleteList, updateList } = require('../../controllers/list.controller');

router.post('/new', createList);
router.delete('/:id', deleteList);
router.put('/:id', updateList);

module.exports = router;