const express = require('express');
const path = require('path');

const router = express.Router();


router.route('/').get((req, res)=>{
  const renderPath = path.join(__dirname, '..', 'views', 'users.hbs');
  res.render(renderPath, {title: "Users Route"})
}
)

module.exports = router;