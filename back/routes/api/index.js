const router = require('express').Router();
const apiUsers = require('./users.routes');
const apiAuth = require('./auth.routes');
const apiKanban = require('./kanban.routes');
const apiList = require('./list.routes');
const apiTask = require('./task.routes');
const apiIndex = require('./idx.routes');

router.use('/users', apiUsers);
router.use('/auth', apiAuth);
router.use('/kanban', apiKanban);
router.use('/kanban/:id/list', apiList)
router.use('/kanban/:kanbanId/list/:listId/task', apiTask)
router.use('/index', apiIndex)

module.exports = router