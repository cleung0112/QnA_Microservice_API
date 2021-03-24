var models = require('../models/index.js');

module.exports = {
  getAll: function (req, res) {
    const params = [req.params.question_id, req.query.page * req.query.count, req.query.count];
    models.answers.getALlNotReportedAnswers( params, (result) => {
      res.status(200).send(result.rows);
    })
  },

  reportAnswerAsHelpful: function(req, res) {
    models.answers.reportAnswerAsHelpful( req.params.answer_id, (result) => {
      if ( result.rows.length === 0 ) {
        return res.status(404).send('Answer id not found in database')
      }
      res.status(204).send();
    })
  },

  reportAnswer: function(req, res) {
    models.answers.reportAnswer( req.params.answer_id, (result) => {
      if ( result.rows.length === 0 ) {
        return res.status(404).send('Answer id not found in database')
      }
      res.status(204).send();
    })
  }
};