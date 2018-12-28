const bodyParser = require("body-parser");

const setGlobalMiddleware = app => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
};

module.exports = setGlobalMiddleware;
