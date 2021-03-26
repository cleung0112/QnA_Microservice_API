var models = require('../Models/index.js');

module.exports = {
  getAll: function (req, res) {
    const viewPage = req.params.page === '1' || !req.params.page ? 0 : req.params.page * req.params.count;
    const params = [req.params.product_id, viewPage, req.params.count];
    models.questions.getALlUnreportedQuestions( params, (result) => {
      res.status(200).send(result.rows);
    })
  },

  postAQuestion: function(req, res) {
    const emailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if ( !emailValidation.test(req.params.email) ) {
      return res.status(404).send('Please enter a valid email');
    }
    const params = [req.params.product_id, req.params.name, req.params.email, req.params.body];
    models.questions.postAQuestion( params, (err, result) => {
      if ( err ) {
        return res.status(404).send('Err at posting the question');
      }
      res.status(201).send('CREATED');
    })
  },

  reportQuestionAsHelpful: function(req, res) {
    models.questions.reportQuestionAsHelpful( req.params.question_id, (result) => {
      if ( result.rows.length === 0 ) {
        return res.status(404).send('Question id not found in database');
      }
      res.status(204).send();
    })
  },

  reportQuestion: function(req, res) {
    models.questions.reportQuestion( req.params.question_id, (result) => {
      if ( result.rows.length === 0 ) {
        return res.status(404).send('Question id not found in database');
      }
      res.status(204).send();
    })
  }
};