const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

// Model
const {
  getUserById,
  getUserByUsername,
  comparePassword,
  User,
} = require("../models/user");

//validator
const { authValidation } = require("../validations/authValidation");
const { runValidation } = require("../validations/index");

const multer = require("multer");
const uploads = multer({ dest: "uploads/" });

// Register Route
router.get("/register", (req, res) => {
  res.render("register", { title: "Register" });
});

router.post(
  "/register",
  uploads.single("profileimage"),
  authValidation,
  runValidation,
  async (req, res) => {
    try {
      const name = req.body.name;
      const email = req.body.email;
      const username = req.body.username;
      const password = req.body.password;
      const password2 = req.body.password2;

      const errors = validationResult(req).array();

      if (password !== password2) {
        errors.push({
          value: password2,
          msg: "Passwords don't match. ",
          param: "password2",
          location: "body",
        });
      }
      if (!req.file) {
        errors.push({
          msg: "Upload Valid Profile Image.",
          param: "profileimage",
          location: "body",
        });
      }

      if (errors.length > 0) {
        // return res.status(400).json({message: "Enter all fields.", errors});
        console.log("errors: ", errors);
        return res.render("register", { errors: errors });
      }

      if (req.file && errors.length === 0) {
        const profileImage = req.file.filename;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await new User({
          name,
          email,
          username,
          password: hashedPassword,
          profileImage,
        });
        await newUser.save();

        req.flash("success", "You are now registered and can log in.");

        res.location("/");
        res.redirect("/");

        // return res.status(200).json({message: "Registration Done."});
        res.render("register", { success: true });
      } else {
        const profileImage = "noimage.jpg";

        // return res.status(500).json({message: "Registration Failed.", errors})
        res.render("register", { errors: errors });
      }
    } catch (error) {
      // return res.status(500).json({Message: "Internal Server error. Please wait.", error})
    }
  }
);

// Configure Passport
passport.use(
  new localStrategy(function (username, password, done) {
    getUserByUsername(username, function (err, user) {
      if (err) {
        console.log("login error >>> ", err)
        throw err;
      }

      if (!user) {
        console.log("no user found >>> ")
        return done(null, false, { message: "Unknown User." });
      }

      comparePassword(password, user.password, function (err, isMatch) {
        if (err) return done(err);

        if (isMatch) {
          console.log("password matched >>> ", isMatch, user);
          return done(null, user);
        } else {
          console.log("password didn't match >>> ");
          return done(null, false, { message: "Invalid Password." });
        }
      });
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  getUserById(id, function (err, user) {
    done(err, user);
  });
});

// Login Route
router.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

// Login using Passport Authentication
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/users/login",
    successRedirect: "/",
    failureFlash: "Invalid username or password.",
  }),
  (req, res) => {
    console.log("login request >>> ", req);
    req.flash('success', 'You are now logged in.')
    res.redirect("/");
  }
);

// Logout
router.get('/logout', (req, res)=>{
  req.logout(function(err){
    if(err) {
      console.log("logout error >>> ", err);
      req.flash('error', 'Error logging out.')
    }

    req.flash('success', 'You are now logged out.');
    res.redirect('/users/login');
  });  
})

module.exports = router;

