// Dependencies
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();

const apiRoutes = require('./apiRoutes/index');
const htmlRoutes = require('./apiRoutes/htmlxs');

// Sets up the Express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(apiRoutes);
app.use(htmlRoutes);

// Starts the server to begin listening
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});