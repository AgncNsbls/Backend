var express = require('express');
var router = express.Router();

const ArticleModel = require('../models/article');

router.post('/article/add', (req, res) => {
 
  ArticleModel.findOne({ title: req.body.title }).then(data => {
    if (data === null) {
     
      const newArticle = new Article({
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        //date: Date,
        banner: req.body.banner,
        introduction: req.body.introduction,
        paragraph: req.body.paragraph,
        conclusion : req.body.conclusion
      });

      newArticle.save().then(newDoc => {
        res.json({ result: true});
      });
    } else {
      res.json({ result: false, error: 'Titre déjà utilisé' });
    }
  });
});



router.post('/articles', (req, res) => {
  ArticleModel.find({ category: req.body.category }).then(data => {
      res.json({ result: true, articles: data });
  });
})



router.get('/articles', (req, res) => {
  
  ArticleModel.find({  }).then(data => {
    console.log("🚀 ~ file: index.js:44 ~ ArticleModel.find ~ data", data)
    res.json({ result: true, articles: data });
  });
});
module.exports = router;
