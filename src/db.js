
const mysql = require('mysql');
const appConfig = require('./config');

const Database = (function() {
    let connection = null;

    function createConnection() {
        const conn = mysql.createConnection(appConfig.db);
        return conn;
    }

    return {
        getConnection() {
            if (!connection) {
                connection = createConnection();
            }
            return connection;
        },

        disconnect() {
            if (this.connection) {
                this.connection.end();
            }
        }
    };
})();

module.exports = Database;


// const mysql = require('mysql');
// const appConfig = require('./config');

// class Database {
//     constructor() {
//         this.connection = null;
//     }

//     connect(config = appConfig) {
//         this.connection = mysql.createConnection(config.db);
//         // console.log(this.connection);
//     }

//     getConnection() {
//         return this.connection;
//     }

//     disconnect() {
//         if (this.connection) {
//             this.connection.end();
//         }
//     }
// }

// const database = new Database();

// module.exports = database;

