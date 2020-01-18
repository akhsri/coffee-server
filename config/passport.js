var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mongoose = require("mongoose");
const User = require("../app/models/user");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email"
    },
    function(username, password, done) {
      console.log(username);
      console.log(password);
      User.findOne({ email: username }, function(err, user) {
        if (err) {
          console.log(user);
          console.log(err);
          return done(err);
        }
        // Return if user not found in database
        if (!user) {
          return done(null, false, {
            message: "User not found"
          });
        }
        // Return if password is wrong
        if (!user.validPassword(password)) {
          return done(null, false, {
            message: "Password is wrong"
          });
        }
        // If credentials are correct, return the user object
        return done(null, user);
      });
    }
  )
);
