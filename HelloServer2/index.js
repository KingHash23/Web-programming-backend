
const express = require('express');
const db = require('./config')
const app = express();
app.use(express.json());
const port = 3000;

const sql = `Create Table if not exists users (
            id int auto_increment primary key, 
            name varchar(15), 
            email varchar(10))`;

db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Table created");
});
// logging middleware  function

function loggingMiddleware(req, res, next) {
    console.log(`Request method: ${req.method}, URL: ${req.url}`);
    next();// passing control to the next middleware/ route handler
}

// we then apply middleware to all routes

app.use(loggingMiddleware);


// Define a route for '/hello'
app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.post('/add-user', (req, res) => {
    const { name, email } = req.body;
    const sql = `INSERT INTO users (name, email) VALUES (?,?)`;
    db.query(sql, [name, email], (err, result) => {
        if (err) throw err;
        res.send('User added successfully');
    });
});
app.get('/users', (req, res) => {
    const sql = `SELECT * FROM users`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
// Middleware to parse JSON request bodies
app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`)
})
// Start the server