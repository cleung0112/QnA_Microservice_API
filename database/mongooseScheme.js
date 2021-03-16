import mongoose from 'mongoose';
const { Schema } = mongoose;

const ProductQuestionsScheme = new Schema({
  product_id: { type: Number, autoIndex: true, unique:true },
  results: [question],
});

const question = new Schema({
  question_id: { type: Number, autoIndex: true },
  question_body: { type: String, required: true },
  question_date: { type: Date, required: true },
  asker_name: { type: String, required: true, unique:true },
  question_helpfulness: { type: Number, default: 0 },
  reported: { type: Boolean, default: false },
  answers: [answer]
});

const answer = new Schema({
  id: { type: Number, autoIndex: true },
  body: { type: String, required: true },
  date: { type: Date, required: true },
  answerer_name: { type: String, required: true, unique:true },
  helpfulness: { type: Number, default: 0 },
  report: { type: Boolean, default: false },
  photos: [photo]
});

const photos = new Schema({
  photoURL: String
});

// const ProductQuestions = db.model('ProductQuestions',ProductQuestionsScheme);
// module.exports = ProductQuestions
