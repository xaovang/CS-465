const mongoose = require('mongoose');
require('../models/user'); // Ensure user schema is registered before usage
const User = mongoose.model('users');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');

// Local strategy setup
passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (username, password, done) => {
      try {
        // Use async/await instead of callbacks
        const user = await User.findOne({ email: username });

        // Check if user exists
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }

        // Validate password
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        // If successful, return the user
        return done(null, user);
      } catch (err) {
        // Handle errors
        return done(err);
      }
    }
  )
);
