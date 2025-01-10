const express = require('express');
const router = express.Router();

// Home page
router.get("/", ensureAuthenticated, (req, res) => {
  console.log("Home page, isAuthenticated >>> ", req);
  res.render('index', {title: "Members"});
});

function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/users/login');
}

module.exports = router;