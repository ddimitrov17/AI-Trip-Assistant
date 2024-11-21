const express = require('express');
const { getAllTypeOfUser } = require('../controllers/plans.controller');
const { isUserLogged } = require('../middleware/user.middleware');

const getAllRouter = express.Router();

getAllRouter.get('/get-all/:type',isUserLogged,getAllTypeOfUser);

module.exports = {
    getAllRouter
}