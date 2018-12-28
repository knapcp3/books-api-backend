const db = require("./../../../db");

getRandomTitle = (req, res, next) => {
  const connection = db.getConnection();
  const q = "SELECT * from Book";
  const query = queryString => {
    return new Promise((resolve, reject) => {
      connection.query(queryString, function(error, results, fields) {
        if (error) return reject(error);
        return resolve(results[randomIndex(results.length)]);
      });
    });
  };

  query(q)
    .then(book => {
      res.json({ title: book.title });
    })
    .catch(err => {
      next(err);
    });

  function randomIndex(num) {
    return Math.floor(Math.random() * num);
  }
};

getBook = (req, res, next) => {
  const connection = db.getConnection();
  const id = req.params.id;
  const queryString = `SELECT * from Book where id=?`;

  const query = queryString => {
    return new Promise((resolve, reject) => {
      connection.query(queryString, [id], function(error, results, fields) {
        if (error) return reject(error);

        if (!results || !results[0]) {
          return reject(new Error("Not Found Error"));
        }

        return resolve(results[0]);
      });
    });
  };

  query(queryString)
    .then(book => {
      res.json(book);
    })
    .catch(err => {
      next(err);
    });
};

postBook = (req, res, next) => {
  const connection = db.getConnection();
  const { author, title, publish_year } = req.body;
  const queryString = `insert into Book (title, author, publish_year) values (?, ?, ?)`;

  const query = queryString => {
    return new Promise((resolve, reject) => {
      connection.query(queryString, [title, author, publish_year], function(
        error,
        results
      ) {
        if (error) return reject(error);

        if (!results) {
          return reject(new Error("Not Found Error"));
        }

        return resolve(results.insertId);
      });
    });
  };

  query(queryString)
    .then(bookId => {
      res.json(bookId);
    })
    .catch(err => {
      next(err);
    });
};

module.exports = { getRandomTitle, getBook, postBook };
