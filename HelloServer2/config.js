const mysql = require('mysql');
require('dotenv').config()
const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT
})
 db.connect((err) => {
    if (err) throw err;
    console.log('Database is connected');
    // \end{code}
})
 module.exports = db;