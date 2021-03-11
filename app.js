const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose').set('debug', true);
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

  mongoose
  .connect(
    'mongodb+srv://sergidoce:iuGinQ4Aj_RB@Nq@safetyout.pvtcw.mongodb.net/SafetyOut?retryWrites=true&w=majority',
    {useNewUrlParser: true, useUnifiedTopology: true}
  )
  .then(result => {
    app.listen(8080);
  })
  .catch(err => console.log(err));

