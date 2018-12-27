const db = require('./../../../db');

greet = (req, res, next) => {
    res.json({ greeting: "hehXDD" });
}

getRandomTitle = (req, res, next) => {
    const connection = db.getConnection();

    const q1 = 'SELECT * from Book';
    const queryFoo = (queryString) => {
        return new Promise((resolve, reject) => {
            connection.query(queryString, function (error, results, fields) {
                if (error) 
                    reject(error);
                resolve(results[randomIndex(results.length)]);
            });
        });
    }

    queryFoo(q1).then(res2 => {
        res.json({ title: res2.title });
    });


    function randomIndex(num) {
        return Math.floor(Math.random() * num);
    }
}

module.exports = { getRandomTitle, greet };