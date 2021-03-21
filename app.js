const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose').set('debug', true);
require('dotenv').config()
const path = require('path');


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  
  const userRoutes = require('./routes/userRoutes');
  app.use('/user', userRoutes);

  console.log("Changes made");
  mongoose
  .connect(
    'mongodb+srv://' + process.env.MONGO_DB_USER + ':' + process.env.MONGO_DB_PASSWORD + '@safetyout.pvtcw.mongodb.net/SafetyOut?retryWrites=true&w=majority',
    {useNewUrlParser: true, useUnifiedTopology: true}
  )
  .then(result => {
    app.listen(process.env.PORT || 8080);
  })
  .catch(err => console.log(err));

