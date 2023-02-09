const router = require('express').Router();
const apiUsers = require('./users');
const apiAuth = require('./auth');
const apiKanban = require('./kanban');
const apiList = require('./list');
const apiTask = require('./task');
const apiIndex = require('./idx');

router.use('/users', apiUsers);
router.use('/auth', apiAuth);
router.use('/kanban', apiKanban);
router.use('/kanban/:id/list', apiList)
router.use('/kanban/:kanbanId/list/:listId/task', apiTask)
router.use('/index', apiIndex)

module.exports = router