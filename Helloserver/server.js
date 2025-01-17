const express = require('express');

const app = express();
const port = 3000;



//  app.get(port, (req, res) =>{
//   res.send('Hello World!');
//  });



// Middleware to parse JSON request bodies
app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`)
})

