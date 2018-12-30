const db = require("./../../../db");
const bookService = require("./../../services/book.service");

getRandomTitle = (req, res, next) => {
  bookService
    .getRandomTitle()
    .then(book => {
      res.json({ title: book.title });
    })
    .catch(err => {
      next(err);
    });
};

getBook = (req, res, next) => {
  const id = req.params.id;

  bookService
    .getBook(id)
    .then(book => {
      res.json(book);
    })
    .catch(err => {
      next(err);
    });
};

postBook = (req, res, next) => {
  const { author, title, publish_year } = req.body;

  bookService
    .addBook(title, author, publish_year)
    .then(bookId => {
      res.json(bookId);
    })
    .catch(err => {
      next(err);
    });
};

getBookQuery = (req, res, next) => {
  const { param } = req.query;

  bookService
    .getBookQuery(param)
    .then(books => {
      res.json(books);
    })
    .catch(err => {
      next(err);
    });
};

module.exports = { getRandomTitle, getBook, postBook, getBookQuery };
