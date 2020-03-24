const { Router } = require('express');
const controller = require('../controllers/tipsController');

const router = Router();

router.get('/', controller.getTipsList);

module.exports = router;
