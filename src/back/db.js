const { host, user, password, database } = require('../db/dbSettings');

const mysql = require('mysql2');

const pool = mysql.createPool({
    host,
    user,
    password,
    database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
