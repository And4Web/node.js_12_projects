const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const pug = require('pug');
// const hbs = require('hbs');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

//dynamic
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');
// app.set('view engine', hbs);
// app.use('views', path.join(__dirname, 'views'))
app.get("/", (req, res)=>{
  res.render('index', {
    title: 'Pug'
  })
})

// Static
const static = path.join(__dirname, './public');
app.use(express.static(static));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res)=>{
  res.send('Hello! This server is running...')
  // res.render('index');
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}! - ${path.join(__dirname, '/views')}`);
  // console.log(path.join(__dirname, 'views'))
});