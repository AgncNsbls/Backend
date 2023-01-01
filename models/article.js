const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
  category: String,
  title: String,
  description: String,
  date: Date,
  banner: String,
  introduction: String,
  paragraph: Array,
  conclusion : String
});

const ArticleModel = mongoose.model('articles', articleSchema);

module.exports = ArticleModel;