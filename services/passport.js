const passport = require("passport");
const googleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys.js");
const { use } = require("passport");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new googleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      //We used .then method to deal with the "promise" returned by the findOne attribute
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          //We already have the user with the given ID
          done(null, existingUser);
        } else {
          // We dont have a user with a given ID so create one
          new User({
            googleId: profile.id,
          })
            .save()
            .then((user) => done(null, user));
        }
      });
    }
  )
);
