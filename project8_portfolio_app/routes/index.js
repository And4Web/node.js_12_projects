const express = require('express');
const path = require('path');

const router = express.Router();

const {fetchAllProjects} = require('../controllers/homepageController');

router.get('/', fetchAllProjects);

module.exports = router;