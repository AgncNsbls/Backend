const mongoose = require('mongoose');

const connectionString = "mongodb+srv://AgenceNuisible:capsule57@testdev.4903omx.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
  .catch(error => console.error(error));
