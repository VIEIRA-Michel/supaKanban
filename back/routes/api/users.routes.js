const router = require('express').Router();
const { userCreate, updatePassword } = require('../../controllers/user.controller');

router.post('/new', userCreate);
router.put('/changePassword', updatePassword);

module.exports = router