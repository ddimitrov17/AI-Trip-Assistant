const express = require('express');
const { createLocationSuggestions, getLocationSuggestionById } = require('../controllers/location.controller');
const { isUserLogged } = require('../middleware/user.middleware');
const { limitRequests } = require('../middleware/limitRequests');

const locationsRouter = express.Router();

locationsRouter.get('/get-locations/:locationsId',getLocationSuggestionById);
locationsRouter.post('/save-location-suggestions',isUserLogged,limitRequests, createLocationSuggestions);

module.exports = {
    locationsRouter
}