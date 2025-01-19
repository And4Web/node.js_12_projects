const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const eMessages = require('express-messages');

const multer = require('multer');
const dotenv = require('dotenv');
const dbConfig = require('./db');

const app = express();
dotenv.config();
// Database config
dbConfig(`${process.env.mongoURL}/bookstore`);

// Global variables
const PORT = process.env.PORT || 5000;
app.locals.variableTest = {first: "here I am", second: "second is here", third: "This is third"}

//json parsing
app.use(express.json());
//form-data parsing
app.use(express.urlencoded({extended: false}))

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//morgan logger
app.use(logger('dev'));

//handle file uploades
const uploads = multer({dest: 'uploads/'});

//static files
app.use(express.static(path.join(__dirname, "public")));

//handle sessions
app.use(session({
  secret: "mySessionSecret",
  resave: true,
  saveUninitialized: true,
  cookie: {secure: true}
}))

// Express-flash and express-messages
app.use(flash());
app.use(function(req, res, next){
  res.locals.messages = eMessages(req, res);
  next();
})

// Routes import
const booksRouter = require('./routes/booksRouter');
const manageRouter = require('./routes/manageRouter');

// Routes
app.get('/', (req, res)=>{
  // res.send({Message: "Hello world"})
  console.log("local variables >>> ", app.locals);
  res.render('index', {title: "Online Bookstore - One place to find all Information"})
})

app.use('/books', booksRouter)
app.use('/about', (req, res, next)=>{
  res.render('about', {title: "About"})
  next()
})
app.use('/cart', (req, res, next)=>{
  res.render('cart', {title: "Cart"})
  next()
})
app.use('/manage', manageRouter);

app.listen(PORT, ()=>console.log(`<<< Server is ONN at PORT-${PORT} >>>`))

module.exports = app;