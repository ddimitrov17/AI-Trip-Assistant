const express = require('express');
const { createItinerary, getItineraryById } = require('../controllers/itinerary.controller');

const itineraryRouter = express.Router();

itineraryRouter.get('/get-itinerary/:itineraryId',getItineraryById);
itineraryRouter.post('/save-itinerary',createItinerary);

module.exports = {
    itineraryRouter
}