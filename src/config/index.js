require('dotenv').config()

const baseConfig = {
    secrets: {},
    port: 3005,
    db: {
        host: 'host',
        port: 3306,
        user: 'user',
        password: process.env.DB_PASSWORD,
        database: 'DBName'
    }
};

module.exports = baseConfig;