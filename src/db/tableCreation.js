const { host, user, password, database } = require('./dbSettings');

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host,
    user,
    password,
    database,
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL server:', err);
        return;
    }
    console.log('Connected to MySQL server!');

    // Create LeaderBoard table
    const createLeaderBoardTableQuery = `
    CREATE TABLE IF NOT EXISTS \`LeaderBoard\` (
      \`id\` INT unsigned NOT NULL AUTO_INCREMENT,
      \`nickname\` VARCHAR(50) NOT NULL,
      \`time\` VARCHAR(50) NOT NULL,
      PRIMARY KEY (\`id\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
  `;

    connection.query(createLeaderBoardTableQuery, (error, results) => {
        if (error) {
            console.error('Error creating LeaderBoard table:', error);
            return;
        }
        console.log('LeaderBoard table created successfully!');
    });

    connection.end();
});
