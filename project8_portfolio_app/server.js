const express = require('express');

require('dotenv').config();
const app = express();

const dbConfig = require('./db');

dbConfig((`${process.env.mongoURL}/nodePortfolio`));

const server = require('http').createServer(app);

const PORT = process.env.PORT || 5000;


app.get('/', (req, res)=>{
  res.send({message: "Hello world - portfolio"})
})

server.listen(PORT, ()=>console.log(`Server is running at PORT ~ ${PORT}`));