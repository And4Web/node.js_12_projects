const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const { engine } = require('express-handlebars');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

require('dotenv').config();

const app = express();

const dbConfig = require('./db');
dbConfig((`${process.env.mongoURL}/eLearning`));

const server = require('http').createServer(app);

// import Routes
const homeRoute = require('./routes');
const usersRoutes = require('./routes/usersRoutes');
const adminRoutes = require('./routes/admin');


// Global Variables
const PORT = process.env.PORT || 5000;

// json and file data parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Express Session
app.use(session({
  secret: "secret",
  saveUninitialized: true,
  resave: true
}))

// Passport
app.use(passport.initialize());
app.use(passport.session());

// connect-flash
app.use(flash());

// global vars
app.use(function(req, res, next){
  res.locals.messages = require('express-messages')(req, res);
  next();
})

// Morgan
app.use(morgan('dev'));

// View Engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// static files
app.use('/', express.static(path.join(__dirname, 'public')));

//Routes 
// app.get('/', async (req, res)=>{
//   res.send({message: "Hello world - eLearning"})
// })
app.use('/', homeRoute);
app.use('/users', usersRoutes);
app.use('/admin', adminRoutes);



server.listen(PORT, ()=>console.log(`Server is running at PORT ~ ${PORT}`));