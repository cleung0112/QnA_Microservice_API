const pool = require('../Database/index.js');
const users = require('./user.js');
const answerPhoto = require('./answerphoto.js');

module.exports = {
  getALlNotReportedAnswers: function (AnswerReq, callback) {
    const query = `SELECT Answers.id, Users.username, answerbody, datewritten, AnswerPhotos.url, helpfulness, reported FROM Answers LEFT JOIN AnswerPhotos ON Answers.id = AnswerPhotos.answerid LEFT JOIN Users on Answers.userId=Users.id WHERE Answers.questionId = $1 AND reported = 0 ORDER BY id OFFSET $2 LIMIT $3`;

    pool.query(query, [...AnswerReq], (err, result) => {
      if (err) {
        console.log('err at getALlNotReportedAnswers', err)
      }
      callback(result)
    })
  },

  postAnAnswer: function (AnswerDetail, callback) {

    const shouldAbortQuery = (err) => {
      callback(err);
      pool.query('ROLLBACK', (err) => {
        if (err) {
          console.log('Err at postAnAnswer', err)
        }
      })
    }

    pool.query('BEGIN', (err) => {
      if (err) {
        shouldAbortQuery(err);
      }

      users.insertUser([AnswerDetail[1], AnswerDetail[2]], (err, result) => {
        if (err) {
          shouldAbortQuery(err);
        }

        pool.query('COMMIT', (err) => {
          if (err) {
            shouldAbortQuery(err);
          }

          users.findUser(AnswerDetail[1], (result) => {
            if (err) {
              shouldAbortQuery(err);
            }
            const answerParams = [AnswerDetail[0], AnswerDetail[3]];
            answerParams.push(result.rows[0].id);

            pool.query(`INSERT INTO Answers (questionId, answerbody, datewritten, userid) VALUES ($1, $2, now(), $3) RETURNING id`, [...answerParams], (err, result) => {
              if (err) {
                shouldAbortQuery(err);
              }

              const answerId = result.rows[0].id;
              if (AnswerDetail[4] !== '[]' && AnswerDetail[4].length > 0 ) {
                const photoURLs = AnswerDetail[4].replace(/ /g, '').slice(1, -1).split(',');
                for (const photoUrl of photoURLs) {
                  answerPhoto.insertPhoto([photoUrl, answerId], (err) => {
                    if (err) {
                      shouldAbortQuery(err);
                    }
                  })
                }

                pool.query('COMMIT', (err, result) => {
                  if (err) {
                    shouldAbortQuery(err);
                  }
                  callback(err, 'CREATED');
                })

              } else {
                pool.query('COMMIT', (err) => {
                  if (err) {
                    shouldAbortQuery(err);
                  } else {
                    callback(err, 'CREATED');
                  }
                })
              }
            })
          })
        })
      })
    })
  },

  reportAnswerAsHelpful: function (AnswerId, callback) {
    const query = `UPDATE Answers SET helpfulness = helpfulness + 1 WHERE id = $1 RETURNING helpfulness`;
    pool.query(query, [AnswerId], (err, result) => {
      if (err) {
        console.log('err at reportAnswerAsHelpful', err)
      }
      callback(result)
    })
  },

  reportAnswer: function (AnswerId, callback) {
    const query = `UPDATE Answers SET reported = reported + 1 WHERE id = $1 RETURNING reported`;
    pool.query(query, [AnswerId], (err, result) => {
      if (err) {
        console.log('err at reportAnswer', err)
      }
      callback(result)
    })
  }
}


