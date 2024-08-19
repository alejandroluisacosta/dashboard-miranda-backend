const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'miranda',
});

try {
    const [results, fields] = connection.query (
        'SELECT * FROM `miranda`'
    )
    console.log(results, fields)
} catch (err) {
    console.log(err);
}

export default connection;