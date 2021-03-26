const controller = require('../controllers/cindex.js');
const router = require('express').Router();

router.get('/:product_id/:page/:count', controller.questions.getAll);
//http://localhost:5001/572/0/2
router.get('/:question_id/answers', controller.answers.getAll);
//http://localhost:5001/572/answers?page=1&count=2
router.post('/:product_id/:name/:email/:body', controller.questions.postAQuestion);

router.post('/:question_id/answers', controller.answers.postAnAnswer);

router.put('/:question_id/helpful', controller.questions.reportQuestionAsHelpful);

router.put('/:question_id/report', controller.questions.reportQuestion);

router.put('/answers/:answer_id/helpful', controller.answers.reportAnswerAsHelpful);

router.put('/answers/:answer_id/report', controller.answers.reportAnswer);

module.exports = router;