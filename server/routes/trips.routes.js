const express = require('express');
const { createTrip, getTripById } = require('../controllers/trips.controller');
const { generateRateLimiter } = require('../middleware/rateLimiter');

const tripRouter = express.Router();

tripRouter.get('/get-trip/:tripId',getTripById);
tripRouter.post('/save-trip',generateRateLimiter, createTrip);

module.exports = {
    tripRouter
}