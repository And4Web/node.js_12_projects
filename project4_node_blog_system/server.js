const express = require('express')
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session')

const expressValidator = require('express-validator');
const multer = require('multer');

const flash = require('connect-flash');
const eMessages = require('express-messages');
const mongo = require('mongodb');
const mongoose = require('mongoose');

require('dotenv').config();


const app = express();
const PORT = 5000

//database
const connectDB = require('./db');
connectDB();

//routes


// Moment
// app.locals.moment = require('moment');

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

// Express-flash

app.use(flash());
app.use(function(req, res, next){
  res.locals.messages = eMessages(req, res);
  next();
})


//routes
// app.get('/', (req, res)=>{
  // console.log("dirnam >>> ", path.join(__dirname, 'views'))
// res.send({message: "Home page - Project 4: Node Blog system"})
//   res.render('index', {title: "Node Blog System"})
// })

const route = require('./routes');
const postsRoutes = require('./routes/postsRoutes');

app.use('/', route);
app.use('/posts', postsRoutes);


app.listen(PORT, ()=>console.log(`~~Project_4 -  Server running at port: ${PORT}`))

module.exports = app;