const express = require('express');

const router = express.Router();

router.get('/', async (req, res)=>{
  // res.send("Admin route")
  const renderPath = require('path').join(__dirname, '..', 'views', 'admin', 'index.hbs');
  res.render(renderPath)
})

module.exports = router;