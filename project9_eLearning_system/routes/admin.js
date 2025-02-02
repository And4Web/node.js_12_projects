const express = require('express');
const path = require('path');

const router = express.Router();


router.route('/').get((req, res)=>{
  const renderPath = path.join(__dirname, '..', 'views', 'admin.hbs');
  res.render(renderPath, {title: "Admin Route"})
}
)

module.exports = router;