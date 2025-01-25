const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', async (req, res)=>{
  // res.send("Index route")
  const renderPath = path.join(__dirname, '..','views', 'home.hbs');
  res.render(renderPath);
})

module.exports = router;