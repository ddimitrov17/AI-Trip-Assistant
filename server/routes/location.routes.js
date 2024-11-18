const express = require('express');
const { createLocationSuggestions, getLocationSuggestionById } = require('../controllers/location.controller');

const locationsRouter = express.Router();

locationsRouter.get('/get-locations/:locationId',getLocationSuggestionById);
locationsRouter.post('/save-location-suggestions',createLocationSuggestions);

module.exports = {
    locationsRouter
}