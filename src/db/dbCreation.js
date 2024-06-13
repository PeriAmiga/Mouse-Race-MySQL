const { host, user, password } = require('./dbSettings');

const mysql = require('mysql2');

// Create a connection to the MySQL server
const connection = mysql.createConnection({
    host,
    user,
    password,
});

// Connect to the MySQL server
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL server:', err);
        return;
    }
    console.log('Connected to MySQL server!');
});

// create a new schema
const schemaName = 'Mouse_Race_LeaderBoard';
connection.query(`CREATE DATABASE IF NOT EXISTS ${schemaName}`, (error, results) => {
    if (error) {
        console.error('Error creating schema:', error);
        return;
    }
    console.log(`Schema ${schemaName} created successfully!`);
});

connection.end();