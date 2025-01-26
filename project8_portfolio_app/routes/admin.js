const express = require('express');
const path = require('path');
const { addProject, getAdminHome } = require('../controllers/adminController');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, path.join(__dirname, '..', 'public', 'images'));
  },
  filename: function(req, file, cb){
    cb(null, file.originalname);
  }
});
const uploads = multer({storage: storage});

const router = express.Router();

router.get('/', getAdminHome);

// router.get('/add', async (req, res)=>{
//   const renderPath = path.join(__dirname, '..', 'views', 'admin', 'add.hbs');
//   res.render(renderPath);
// })

// router.post('/add', uploads.single('projectImage'), addProject)

// import validators:
const {runValidation} = require('../validation/index');
const {projectValidation} = require('../validation/projectValidation');

router.route('/add').get(async (req, res)=>{
  const renderPath = path.join(__dirname, '..', 'views', 'admin', 'add.hbs');
  res.render(renderPath);
}).post(uploads.single('projectImage'), projectValidation, runValidation, addProject);

module.exports = router;