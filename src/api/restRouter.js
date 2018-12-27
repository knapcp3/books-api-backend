const express = require('express');
const { bookRouter } = require('./resources/book'); 
const restRouter = express.Router();

restRouter.use("/book", bookRouter);

module.exports =  { restRouter };
