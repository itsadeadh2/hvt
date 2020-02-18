const heroController = require('./controller');
const express = require('express');
const router = express.Router();

router.post('/', heroController.post);
router.get('/', heroController.getAll);
router.get('/:name', heroController.getHeroByName);
router.post('/addPower/:name', heroController.addSuperPower);

module.exports = router;