const rateLimit = require('express-rate-limit');

const generateRateLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, 
    max: 1, 
    message: 'You can only generate itineraries, destination suggestions, and trips once every 5 minutes.'
});

module.exports = {
    generateRateLimiter
};