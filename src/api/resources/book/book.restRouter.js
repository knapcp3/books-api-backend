const express = require('express');
const bookController = require('./book.controller');

const bookRouter = express.Router();

bookRouter.get('/random-title', bookController.getRandomTitle);

bookRouter.get('/:id', bookController.getBook);

bookRouter.post('/', bookController.postBook);

module.exports = { bookRouter };