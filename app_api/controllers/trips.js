const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');

// Helper function: getUser
const getUser = (req, res, callback) => {
    if (req.payload && req.payload.email) {
        callback(null, req.payload);
    } else {
        return res.status(401).json({ message: 'User not authorized.' });
    }
};

// GET: /trips - lists all the trips
const tripsList = async (req, res) => {
    try {
        const trips = await Model.find({});
        if (!trips || trips.length === 0) {
            return res.status(404).json({ error: 'No trips found' });
        }
        return res.status(200).json(trips);
    } catch (error) {
        return res.status(500).json({ error: 'Error retrieving trips', details: error.message });
    }
};

// GET: /trips/:tripCode - lists a single trip
const tripsFindByCode = async (req, res) => {
    try {
        const trip = await Model.findOne({ code: req.params.tripCode });
        if (!trip) {
            return res.status(404).json({ error: 'Trip not found' });
        }
        return res.status(200).json(trip);
    } catch (error) {
        return res.status(500).json({ error: 'Error retrieving trip', details: error.message });
    }
};

// POST: /trips - Adds a new Trip with getUser validation
const tripsAddTrip = async (req, res) => {
    getUser(req, res, async (err, user) => {
        if (err) {
            return res.status(401).json(err);
        }

        try {
            const newTrip = await Trip.create({
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description,
            });

            return res.status(201).json(newTrip); // Success - Created
        } catch (error) {
            return res.status(400).json({
                message: 'Error creating trip',
                details: error.message,
            });
        }
    });
};

// PUT: /trips/:tripCode - Updates an existing Trip with getUser validation
const tripsUpdateTrip = async (req, res) => {
    getUser(req, res, async (err, user) => {
        if (err) {
            return res.status(401).json({ message: 'User not authorized.' });
        }

        try {
            const updatedTrip = await Trip.findOneAndUpdate(
                { code: req.params.tripCode }, // Filter
                {
                    code: req.body.code,
                    name: req.body.name,
                    length: req.body.length,
                    start: req.body.start,
                    resort: req.body.resort,
                    perPerson: req.body.perPerson,
                    image: req.body.image,
                    description: req.body.description,
                },
                { new: true, runValidators: true } // Return updated trip, validate inputs
            );

            if (!updatedTrip) {
                return res.status(404).json({
                    message: `Trip not found with code ${req.params.tripCode}`,
                });
            }

            return res.status(200).json(updatedTrip); // Success
        } catch (error) {
            return res.status(500).json({
                message: 'Error updating trip',
                details: error.message,
            });
        }
    });
};

// DELETE: /trips/:tripCode - Deletes a trip with getUser validation
const tripsDeleteTrip = async (req, res) => {
    getUser(req, res, async (err, user) => {
        if (err) {
            return res.status(401).json({ message: 'User not authorized.' });
        }

        try {
            const deletedTrip = await Trip.findOneAndDelete({ code: req.params.tripCode });

            if (!deletedTrip) {
                return res.status(404).json({
                    message: `Trip not found with code ${req.params.tripCode}`,
                });
            }

            return res.status(200).json({
                message: `Trip with code ${req.params.tripCode} deleted successfully.`,
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Error deleting trip',
                details: error.message,
            });
        }
    });
};

// Export functions for routes
module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip,
    getUser,
};
