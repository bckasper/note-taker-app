// Requirements for importing packages
const express = require('express')
const path = require('path')
const fs = require('fs')
const notesDB = require('./db/db.json')

// Initialize PORT and Express Application
const PORT = process.env.PORT || 3001;
const app = express();

// Static middleware for the public folder
app.use(express.static('public'));
app.get('/', (request, response) => response.sendFile(path.join(__dirname, '/public/')));

// Body Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));