// Dependencies
const express = require('express');
const index = require('./routes/index');
const path = require('path');

// Sets up the Express app to handle data parsing
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('public'));
app.use(express.json());


app.use("/api", index);


app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Starts the server to begin listening
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}!`);
});