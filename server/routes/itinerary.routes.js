const express = require('express');
const { createItinerary, getItineraryById } = require('../controllers/itinerary.controller');
const { generateRateLimiter } = require('../middleware/rateLimiter');

const itineraryRouter = express.Router();

itineraryRouter.get('/get-itinerary/:itineraryId',getItineraryById);
itineraryRouter.post('/save-itinerary',generateRateLimiter, createItinerary);

module.exports = {
    itineraryRouter
}