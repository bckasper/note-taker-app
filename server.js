// Requirements for importing packages
const express = require('express')
const path = require('path')
const fs = require('fs')
const notesDB = require('./db/db.json');

// Initialize PORT and Express Application
const PORT = process.env.PORT || 3000;
const app = express();

// Static middleware for the public folder
app.use(express.static('public'));
app.get('/', (request, response) => response.sendFile(path.join(__dirname, '/public/')));

// Body Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Public files
app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'public/index.html'))
})

app.get('/notes', (request, response) => {
    response.sendFile(path.join(__dirname, 'public/notes.html'))
})

// Get API for reading the current notes
app.get('/api/notes', (request, response) => {
    fs.readFile('./db/db.json', (error, notes) => {
        if(error){console.log(error)}
                response.json(JSON.parse(notes))
    })
})

// Listening for application
app.listen(PORT, () => {
    console.log(`Note Taker app is listening on PORT ${PORT}`)
})