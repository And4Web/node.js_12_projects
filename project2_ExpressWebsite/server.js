const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const pug = require('pug');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res)=>{
  res.send('Hello! This server is running...')
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});