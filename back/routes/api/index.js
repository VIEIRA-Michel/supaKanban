const router = require('express').Router();
const apiUsers = require('./users');
const apiAuth = require('./auth');

router.get('/test', (req, res) => {
    res.json('ok');
})

router.use('/users', apiUsers);
router.use('/auth', apiAuth);

module.exports = router