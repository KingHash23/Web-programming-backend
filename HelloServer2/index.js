
const express = require('express');

const app = express();
const port = 3000;

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

// Middleware to parse JSON request bodies
app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`)
})
// Start the server