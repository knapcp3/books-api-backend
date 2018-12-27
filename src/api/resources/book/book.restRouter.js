const express = require('express');
const bookController = require('./book.controller');

const bookRouter = express.Router();

bookRouter.get('/greet', bookController.greet);

bookRouter.get('/random-title', bookController.getRandomTitle);

module.exports = { bookRouter };