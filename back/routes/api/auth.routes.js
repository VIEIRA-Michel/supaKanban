const router = require('express').Router();
const { sessionCreate, sessionDelete } = require('../../controllers/auth.controller');

router.post('/signin', sessionCreate)
router.delete('/signout', sessionDelete);

module.exports = router