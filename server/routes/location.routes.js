const express = require('express');
const { createLocationSuggestions, getLocationSuggestionById } = require('../controllers/location.controller');
const { generateRateLimiter } = require('../middleware/rateLimiter');

const locationsRouter = express.Router();

locationsRouter.get('/get-locations/:locationsId',getLocationSuggestionById);
locationsRouter.post('/save-location-suggestions',generateRateLimiter, createLocationSuggestions);

module.exports = {
    locationsRouter
}