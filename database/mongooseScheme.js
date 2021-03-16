import mongoose from 'mongoose';
const { Schema } = mongoose;

const ProductQnASchema = new Schema({
  product_id: { type: Number, autoIndex: true, unique:true },
  results: [questionSchema],
});

const questionSchema = new Schema({
  _id: { type: Number, autoIndex: true },
  question_body: { type: String, required: true },
  question_date: { type: Date, required: true, default: Date },
  asker_name: { type: String, required: true },
  question_helpfulness: { type: Number, default: 0 },
  reported: { type: Boolean, default: false },
  answers: [answerSchema]
});

const answerSchema = new Schema({
  _id: { type: Number, autoIndex: true },
  body: { type: String, required: true },
  date: { type: Date, required: true, default: Date },
  answerer_name: { type: String, required: true },
  helpfulness: { type: Number, default: 0 },
  report: { type: Boolean, default: false },
  photos: [photosSchema]
});

const photosSchema  = new Schema({
  photoURL: String
});

const ProductQnA = db.model('ProductQuestions',ProductQnASchema);
// module.exports = ProductQuestions

// referencing approach

const ProductQnASchema = new Schema({
  product_id: { type: Number, autoIndex: true, unique:true },
  results: [questionSchema]
});

const questionSchema = new Schema({
  question_body: { type: String, required: true },
  question_date: { type: Date, required: true, default: Date },
  asker_name: { type: String, required: true },
  question_helpfulness: { type: Number, default: 0 },
  reported: { type: Boolean, default: false },
  answers: { type: mongoose.Schema.Types.ObjectId,
    ref: 'Answers'}
});

const answerSchema = new Schema({
  body: { type: String, required: true },
  date: { type: Date, required: true, default: Date },
  answerer_name: { type: String, required: true },
  helpfulness: { type: Number, default: 0 },
  report: { type: Boolean, default: false },
  photos: { type: mongoose.Schema.Types.ObjectId,
    ref: 'Photos'}
});

const Answers = db.model('Answers',answerSchema);

const photosSchema  = new Schema({
  photoURL: String
});

const photos = db.model('Photos',photosSchema);
