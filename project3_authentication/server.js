const express = require('express')
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const expressValidator = require('express-validator');
const multer = require('multer');
const flash = require('connect-flash');
const mongo = require('mongodb');
const mongoose = require('mongoose');

//database
const db = mongoose.connection;

//routes
const index = require('./routes')
const users = require('./routes/users');

const app = express();
const PORT = 5000

//json parsing
app.use(express.json());

//view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');

//morgan logger
app.use(logger('dev'));

//handle file uploades
const uploads = multer({dest: 'uploads/'});
// app.use(multer({dest: 'uploads/'}));

//express-messages
app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//static files
app.use(express.static(path.join(__dirname, "public")));

//handle sessions
app.use(session({
  secret: "mySessionSecret",
  resave: true,
  saveUninitialized: true,
  cookie: {secure: true}
}))

//Passport
app.use(passport.initialize());
app.use(passport.session());

//validator

//routes
app.get('/', (req, res)=>{
  res.render('index', {title: 'Members'});
})
// app.use('/', index);
app.use('/users', users);

app.listen(PORT, ()=>console.log(`Server running at port: ${PORT}`))

module.exports = app;