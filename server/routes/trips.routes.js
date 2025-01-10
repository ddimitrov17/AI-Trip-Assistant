const express = require('express');
const { createTrip, getTripById } = require('../controllers/trips.controller');
const { isUserLogged } = require('../middleware/user.middleware');
const { limitRequests } = require('../middleware/limitRequests');

const tripRouter = express.Router();

tripRouter.get('/get-trip/:tripId',getTripById);
tripRouter.post('/save-trip',isUserLogged,limitRequests, createTrip);

module.exports = {
    tripRouter
}