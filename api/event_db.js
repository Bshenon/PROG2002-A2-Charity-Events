const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'charityevents_db'
});

connection.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }

    console.log('Connected to charityevents_db');
});

module.exports = connection;