const express = require('express');
const { createItinerary, getItineraryById } = require('../controllers/itinerary.controller');
const { isUserLogged } = require('../middleware/user.middleware');

const itineraryRouter = express.Router();

itineraryRouter.get('/get-itinerary/:itineraryId',getItineraryById);
itineraryRouter.post('/save-itinerary',isUserLogged, createItinerary);

module.exports = {
    itineraryRouter
}