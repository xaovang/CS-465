const express = require('express');
const router = express.Router();
const { expressjwt: jwt } = require('express-jwt'); // Correct import for express-jwt v7
const authController = require('../controllers/authentication');
const tripsController = require('../controllers/trips');

// JWT Middleware configuration
const auth = jwt({
  secret: process.env.JWT_SECRET, // JWT secret stored in the environment variable
  requestProperty: 'payload',     // The decoded JWT payload will be attached to req.payload
  algorithms: ['HS256']           // Algorithm used to sign the token
});

// Trips endpoints
router
  .route('/trips')
  .get(tripsController.tripsList)        // GET all trips (public)
  .post(auth, tripsController.tripsAddTrip); // POST a new trip (protected with JWT)

router
  .route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode)  // GET a trip by its code (public)
  .put(auth, tripsController.tripsUpdateTrip) // PUT - Update a trip (protected with JWT)
  .delete(auth, tripsController.tripsDeleteTrip); // DELETE - Remove a trip (protected with JWT)

// Authentication endpoints
router.route('/register').post(authController.register); // Register a new user
router.route('/login').post(authController.login);       // Login an existing user

console.log('Login route registered');
router.route('/login').post(authController.login);


module.exports = router;
