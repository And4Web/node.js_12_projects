const express = require('express');
const dbConfig = require('./db');


require('dotenv').config();
const app = express();
const server = require('http').createServer(app);
const PORT = process.env.PORT || 5000;

dbConfig(`${process.env.mongoURL}/findADoc`);

app.get('/', (req, res)=>{
  res.send({message: "hi!"})
})

server.listen(PORT, ()=>console.log(`~~~ Server is running at PORT: ${PORT} ~~~`))
