const express = require('express');
const path = require('path');

const router = express.Router();


router.route('/').get((req, res)=>{
  const renderPath = path.join(__dirname, '..','views', 'home.hbs')
  res.render(renderPath, {title: "Home Route"})
}
)

module.exports = router;