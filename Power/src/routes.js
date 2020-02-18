const express = require('express');
const powerController = require('./controller');
const router = express.Router();

router.post('/', powerController.post);
router.get('/', powerController.getAll);
router.get('/:name', powerController.getByName);

module.exports = router;