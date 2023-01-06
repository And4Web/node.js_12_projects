const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const pug = require('pug');
const nodemailer = require('nodemailer');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//dynamic
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');

app.get("/", (req, res)=>{
  res.render('index', {
    title: 'Pug'
  });
  // console.log(req.url);
})

// Static
const static = path.join(__dirname, './public');
app.use(express.static(static));

app.get('/', (req, res)=>{
  res.send('Hello! This server is running...')
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
  // console.log(path.join(__dirname, 'views'))
});