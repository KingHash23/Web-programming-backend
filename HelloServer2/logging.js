// logging in middleware function

const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};

// route handler function

const home = (req, res) => {
    res.send('Hello, World!');
    };

// middleware function registration
app.use(logger);

// route registration
app.get('/', home);
