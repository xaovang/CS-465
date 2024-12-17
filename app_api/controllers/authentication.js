const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');

// Register a new user
const register = async (req, res) => {
  try {
    // Validate required fields
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists.' });
    }

    // Create a new user instance
    const user = new User();
    user.name = name;
    user.email = email;
    user.setPassword(password);

    // Save the user to the database
    await user.save();

    // Generate JWT token
    const token = user.generateJwt();

    // Return the token
    return res.status(201).json({ token, message: 'User registered successfully.' });
  } catch (err) {
    // Log and return error
    console.error('Error during registration:', err);
    return res.status(500).json({ message: 'Internal server error.', error: err.message });
  }
};

// Log in an existing user
const login = (req, res) => {
  // Validate required fields
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Authenticate the user using Passport
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Error during login:', err);
      return res.status(500).json({ message: 'Internal server error.', error: err.message });
    }
    if (!user) {
      return res.status(401).json({ message: info.message || 'Authentication failed.' });
    }

    // Generate JWT token
    const token = user.generateJwt();

    // Return the token
    return res.status(200).json({ token, message: 'Login successful.' });
  })(req, res);
};

module.exports = {
  register,
  login,
};
