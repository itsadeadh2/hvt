const express = require('express');
const router = express.Router();

const threatController = require('./controller');

router.post('/', threatController.post);
router.post('/addPower/:name', threatController.updateRequiredPower);
router.get('/', threatController.getAll);
router.get('/:name', threatController.getByName);
router.post('/resolve/:name', threatController.resolve);

module.exports = router;