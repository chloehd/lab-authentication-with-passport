const express        = require("express");
const passportRouter = express.Router();
// Require user model
const User = require("../models/user.js");

// Add bcrypt to encrypt passwords
const bcrypt = require("bcrypt");


// Add passport 
const passport = require("passport");

const ensureLogin = require("connect-ensure-login");

passportRouter.get("/signup", (req, res, next) => {
  res.render("passport/signup.hbs");
});

passportRouter.post("/process-signup", (req, res, next) => {
  const { username, password } = req.body;

  User.create( { username, password })
  .then(signupDoc => {
    res.redirect("/");
  })
  .catch(err => next(err));
});


passportRouter.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("passport/private", { user: req.user });
});




module.exports = passportRouter;