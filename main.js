const fs = require('fs');
const fastscv = require('fast-csv');
const models = require('./Models');

const questions = fs.createReadStream('questiontest.csv');
const qData = [];
const quID = new Set();
const qStream = fastscv.parse({ ignoreEmpty: true, quote: '"', escape: '"', })
  .on('error', (err, ...arguments) => {
    console.log(err)
  })
  .on('data', (data) => {
    qData.push(data);
    quID.add(data[0]);
  })
  .on('end', () => {
    const answers = fs.createReadStream('answer.csv');
    const ansData = [];
    const ansID = new Set();
    const ansStream = fastscv.parse({ ignoreEmpty: true, quote: '"', escape: '"', })
      .on('data', (data) => {
        if (quID.has(data[1])) {
          ansData.push(data);
          ansID.add(data[0]);
        }
      })
      .on('end', () => {
        const photos = fs.createReadStream('photo.csv');
        const photoData = [];
        const photoStream = fastscv.parse({ ignoreEmpty: true, quote: '"', escape: '"' })
          .on('data', (data) => {
            if (ansID.has(data[1])) {
              photoData.push(data);
            }
          })
          .on('end', () => {
            console.log(qData);
            qData.shift();
            qData.map((question) => {
              // models.product.insertProduct(question.product_id);
              // models.user.insertUser([question.asker_name, question.asker_email]);
              // let userId = models.user.findUser(question.asker_name);
              // let productId = models.product.findProduct(question.product_id);
              // models.questions.insertQuestions([question.body, question.helpful, question.reported, `${userId}`, `${productId}`, question.date_written])
            })
            // models.product.insertProduct(4312);
            // models.user.insertUser(['tester', 'insert']);
            // models.questions.insertQuestions(['test', 12, 0, '123', 1232, '2020-9-01'])
            // models.answers.insertAnswers(['answ1', 2, 0, '2020-9-01', 'tester'])
            // models.answerphoto.insertPhoto(['urltest', '1'])
            // models.QnA.insertQnA(['2', '1']);
          })

        photos.pipe(photoStream);

      })

    answers.pipe(ansStream);

  })

questions.pipe(qStream);
