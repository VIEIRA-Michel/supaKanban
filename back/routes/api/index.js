const router = require('express').Router();
const apiUsers = require('./users');

router.get('/test', (req, res) => {
    res.json('ok');
})

router.use('/users', apiUsers);

module.exports = router