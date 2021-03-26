var models = require('../models/index.js');

module.exports = {
  getAll: function (req, res) {
    const viewPage = req.query.page === '1' || !req.query.page ? 0 : req.query.page * req.query.count;
    const params = [req.params.question_id, viewPage, req.query.count || 5 ];
    models.answers.getALlNotReportedAnswers( params, (result) => {
      res.status(200).send(result.rows);
    })
  },

  postAnAnswer: function(req, res) {
    const emailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if ( !emailValidation.test(req.query.email) ) {
      return res.status(404).send('Please enter a valid email');
    }
    const params = [req.params.question_id, req.query.name, req.query.email, req.query.body, req.query.photos || '[]' ];
    models.answers.postAnAnswer( params, (err, result) => {
      if ( err ) {
        return res.status(404).send('Err at posting the answer');
      }
      res.status(201).send('CREATED');
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