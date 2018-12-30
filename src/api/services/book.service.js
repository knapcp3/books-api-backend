const db = require("./../../db");

const BookService = {
  getRandomTitle: function() {
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

    function randomIndex(num) {
      return Math.floor(Math.random() * num);
    }
    return query(q);
  },

  getBook: function(id) {
    const connection = db.getConnection();
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
    return query(queryString);
  },

  addBook: function(title, author, publish_year) {
    const connection = db.getConnection();
    const queryString = `insert into Book (title, author, publish_year) values (?, ?, ?)`;

    if (!author || !title || (!publish_year && publish_year !== 0)) {
      next(new Error("Empty values!"));
    }

    const query = queryString => {
      return new Promise((resolve, reject) => {
        connection.query(
          queryString,
          [title, author, publish_year],
          (error, results) => {
            if (error) return reject(error);
            if (!results) {
              return reject(new Error("Not Found Error"));
            }
            return resolve(results.insertId);
          }
        );
      });
    };

    return query(queryString);
  },

  getBookQuery: function(term) {
    const connection = db.getConnection();

    const p = connection.escape(term).substring(1, term.length + 1);

    const queryStr = `
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

    return query(queryStr);
  }
};

module.exports = BookService;
