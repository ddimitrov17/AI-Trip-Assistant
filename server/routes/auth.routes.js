const express = require('express');
const { signup, login, current, logout } = require('../controllers/auth.controller');
const { isUserLogged } = require('../middleware/user.middleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/current', isUserLogged, current);
router.post('/logout', logout); 

module.exports = {
    router
};