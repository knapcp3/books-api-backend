const db = require("./../../../db");
const mysql = require("mysql");
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

  if (!author || !title || (!publish_year && publish_year !== 0)) {
    next(new Error("Empty values!"));
  }

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

getBookQuery = (req, res, next) => {
  const connection = db.getConnection();

  const { param } = req.query;

  const p = connection.escape(param).substring(1, param.length + 1);

  const queryString = `
    select *
    from Book
    where title like "%${p}%" or author like "%${p}%"
    order by
    case when locate('${p}', title) = 1 then 0
    when locate('${p}', author) = 1 then 1
    when locate(' ${p}', title) != 0 then 2
    when locate(' ${p}', author) = 1 then 3
    else 4 end
    limit 6;`;

  const query = queryString => {
    return new Promise((resolve, reject) => {
      connection.query(queryString, function(error, results) {
        if (error) return reject(error);

        if (!results) {
          return reject(new Error("Not Found Error"));
        }

        return resolve(results);
      });
    });
  };

  query(queryString)
    .then(books => {
      res.json(books);
    })
    .catch(err => {
      next(err);
    });
};

module.exports = { getRandomTitle, getBook, postBook, getBookQuery };
