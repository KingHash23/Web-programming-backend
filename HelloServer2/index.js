
const express = require('express');

const app = express();
const port = 3000;

// Define a route for '/hello'
app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

// Middleware to parse JSON request bodies
app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`)
})
