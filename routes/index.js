var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer'); 

const ArticleModel = require('../models/article');
const ContactModel = require('../models/contact')

router.post('/article/add', (req, res) => {
 
  ArticleModel.findOne({ title: req.body.title }).then(data => {
    if (data === null) {
     
      const newArticle = new ArticleModel({
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
        res.json({ result: true, article : newDoc});
      });
    } else {
      res.json({ result: false, error: 'Titre déjà utilisé' });
    }
  });
});

router.delete('/article', (req, res) => {
 
  ArticleModel.deleteOne({ title: req.body.title }).then(() => {
    ArticleModel.find().then(data => {
      console.log(data);
      res.json({ result: true, articles: data });
    });
   });
});



router.post('/articles', async (req, res) => {
  const data = await ArticleModel.find({ category: req.body.category })
      res.json({ result: true, articles: data });
  
})



router.get('/articles', async (req, res) => {
  
  const data = await ArticleModel.find({ })
  res.json({ result: true, articles: data });
});



router.post('/contact', async (req, res) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'agencenuisibles.dev@gmail.com',
      pass: 'fmpepblvbbezxmtk'
    },
    secure:false,
    // here it goes
    tls: {rejectUnauthorized: false},
    debug:true
  });
  var mailOptions = {
    from: 'agencenuisibles.dev@gmail.com',
    to: 'dohollo.an@gmail.com',
    subject: 'Nouvelle demande de contact',
    text: 'Une nouvelle demande de contact vous attend'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  }); 

  const newContact = new ContactModel( {
    prenom: req.body.prenom,
  nom: req.body.nom,
  message: req.body.message,
  //date: Date,
  mail: req.body.mail,
  type: req.body.type,
  postal: req.body.postal,
  phone : req.body.phone,
  lu: false,
  })
 await newContact.save()
  res.json({ result: true});
  
});

router.get('/contact/message', async (req, res) => {
  let data
  if (req.body.nonLu) {
    data = await ContactModel.find({ lu : false})
  } else{
  data = await ContactModel.find({ })}
  res.json({ result: true, messages: data });
});

router.put('/contact/status', async (req, res) => {
   await ContactModel.findByIdAndUpdate( req.body.id, { status: req.body.status})
   const response = await ContactModel.findById(req.body.id)
   const responses = await ContactModel.find({})
   console.log("🚀 ~ file: index.js:81 ~ router.put ~ responses", responses)
   console.log("🚀 ~ file: index.js:79 ~ router.put ~ response", response)
  console.log("🚀 ~ file: index.js:79 ~ router.put ~ response", req.body)
  res.json({ result: true, message : response, messages : responses })
})

router.put('/contact/read', async (req, res) => {
  await ContactModel.findByIdAndUpdate( req.body.id, { lu: req.body.read})
  const response = await ContactModel.findById(req.body.id)
  const responses = await ContactModel.find({})
  console.log("🚀 ~ file: index.js:81 ~ router.put ~ responses", responses)
  console.log("🚀 ~ file: index.js:79 ~ router.put ~ response", response)
 console.log("🚀 ~ file: index.js:79 ~ router.put ~ response", req.body)
 res.json({ result: true, message : response, messages : responses })
})

module.exports = router;