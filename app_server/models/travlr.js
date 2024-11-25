const mongoose = require('mongoose');

// Define the trip schema
const tripSchema = new mongoose.Schema({
    code: { type: String, required: true, index: true },
    name: { type: String, required: true, index: true },
    length: { type: String, required: true },
    start: { type: Date, required: true },
    resort: { type: String, required: true },
    perPerson: { type: String, required: true }, // You might want to change this to Number or Decimal for better handling
    image: { type: String, required: true },
    description: { type: String, required: true }
});

// Create the model
const Trip = mongoose.model('Trip', tripSchema); // Mongoose automatically handles pluralization of model name for collection

module.exports = Trip;
