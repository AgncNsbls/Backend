const mongoose = require('mongoose');


const contactSchema = mongoose.Schema({
  prenom: String,
  nom: String,
  message: String,
  date: Date,
  mail: String,
  type: String,
  postal: String,
  phone : String,
  lu : Boolean,
  status : String,
});

const ContactModel = mongoose.model('contact', contactSchema);

module.exports = ContactModel;