const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { engine } = require('express-handlebars');


require('dotenv').config();
const app = express();
const dbConfig = require('./db');
dbConfig((`${process.env.mongoURL}/nodePortfolio`));

const server = require('http').createServer(app);

// Global Variables
const PORT = process.env.PORT || 5000;

// json and file data parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Morgan
app.use(morgan('dev'));

// View Engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// static files
app.use('/', express.static(path.join(__dirname, 'public')));

const indexRoutes = require('./routes/index');
const adminRoutes = require('./routes/admin');
const projectsRoutes = require('./routes/projects');

// app.get('/', async (req, res)=>{
//   res.send({message: "Hello world - portfolio"})

  // const projects = await Project.find({},{__v:0, updatedAt: 0, createdAt: 0, });

  // return res.status(200).json({projects});
// })

//Routes 
app.use('/', indexRoutes);
app.use('/admin', adminRoutes);
app.use('/projects', projectsRoutes);




server.listen(PORT, ()=>console.log(`Server is running at PORT ~ ${PORT}`));