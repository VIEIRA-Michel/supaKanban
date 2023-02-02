const router = require('express').Router();
const apiUsers = require('./users');
const apiAuth = require('./auth');
const apiKanban = require('./kanban');

router.use('/users', apiUsers);
router.use('/auth', apiAuth);
router.use('/kanban', apiKanban);

module.exports = router