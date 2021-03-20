const controller = require('../controllers/index.js');
const router = require('express').Router();

router.get('/:product_id/:page/:count', controller.questions.getAll);

module.exports = router;