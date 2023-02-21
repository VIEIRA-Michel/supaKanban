const router = require('express').Router();
const { updateTaskIndex } = require('../../controllers/idx.controller');


router.put('/:id', updateTaskIndex)


module.exports = router
