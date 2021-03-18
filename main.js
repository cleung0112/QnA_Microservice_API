const fs = require('fs');
const fastscv = require('fast-csv');

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

          })

        photos.pipe(photoStream);

      })

    answers.pipe(ansStream);

  })

questions.pipe(qStream);
