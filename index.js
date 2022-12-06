// Import express
const express = require('express');

// Initialize the app
const app = express();
app.use(express.urlencoded({ extended: true }));

// Import Routes
const routes = require('./routes/routes');

app.use('/', routes);

// Setup server port
app.listen(3000);
console.log('Server running on port 3000');