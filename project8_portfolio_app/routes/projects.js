const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', async (req, res)=>{
  // res.send("Projects route")
  const renderPath = path.join(__dirname, '..', 'views', 'projects', 'index.hbs');
  res.render(renderPath)
})

module.exports = router;