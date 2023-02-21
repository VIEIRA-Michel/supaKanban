const router = require('express').Router();
const { sessionCreate, sessionDelete, checkAuthentication } = require('../../controllers/auth.controller');
const { ensureAuthenticated } = require('../../config/security.config');

router.post('/signin', sessionCreate)
router.delete('/signout', sessionDelete);
router.get('/current', ensureAuthenticated, checkAuthentication);

module.exports = router