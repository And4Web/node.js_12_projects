const express = require('express');
const path = require('path');

const router = express.Router();

const {getProjectDetails} = require('../controllers/projectController');

router.get('/', async (req, res)=>{
  // res.send("Projects route")
  const renderPath = path.join(__dirname, '..', 'views', 'projects', 'index.hbs');
  res.render(renderPath)
})

router.get('/details/:projectId', getProjectDetails)

module.exports = router;