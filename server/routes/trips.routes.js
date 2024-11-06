const express = require('express');
const { createTrip, getTripById } = require('../controllers/trips.controller');

const tripRouter = express.Router();

tripRouter.get('/get-trip/:tripId',getTripById);
tripRouter.post('/save-trip',createTrip);

module.exports = {
    tripRouter
}