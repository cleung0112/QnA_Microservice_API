var models = require('../models/index.js');

module.exports = {
  getAll: function (req, res) {
    const params = [req.params.product_id, req.params.page * req.params.count, req.params.count];
    models.questions.getALlUnreportedQuestions( params, (result) => {
      res.status(200).send(result.rows);
    })
  },

  postAQuestion: function(req, res) {
    const params = [req.params.product_id, req.params.name, req.params.email, req.params.body];
    models.questions.postAQuestion( params, (result) => {
      res.status(201).send('CREATED');
    })
  },

  reportQuestionAsHelpful: function(req, res) {
    models.questions.reportQuestionAsHelpful( req.params.question_id, (result) => {
      if ( result.rows.length === 0 ) {
        return res.status(200).send('Question id not found in database');
      }
      res.status(204).send();
    })
  },

  reportQuestion: function(req, res) {
    models.questions.reportQuestion( req.params.question_id, (result) => {
      if ( result.rows.length === 0 ) {
        return res.status(200).send('Question id not found in database');
      }
      res.status(204).send();
    })
  }
};