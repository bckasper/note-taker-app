// Requirements for importing packages
const express = require('express')
const path = require('path')
const fs = require('fs');
const e = require('express');

// Initialize PORT and Express Application
const PORT = process.env.PORT || 3000;
const app = express();

// Static middleware for the public folder
app.use(express.static('public'));
app.get('/', (request, response) => response.sendFile(path.join(__dirname, '/public/')));

// Body Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
// Static Public HTML file routes
app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'public/notes.html'))
})

app.get('/notes', (request, response) => {
    response.sendFile(path.join(__dirname, 'public/notes.html'))
})

// APIs
// Get API for reading the current notes
app.get('/api/notes', (request, response) => {
    fs.readFile('./db/db.json', 'utf8', (error, notes) => {
        if(error){console.log(error)}
                response.json(JSON.parse(notes))
    })
})

// Post API for saving the entered note
app.post('/api/notes', (request, response) => {
    
    const { title, text } = request.body

    // Checks that both a title and text were saved
    if (title && text) {
    
        // New note to be saved
        const newNote = {
            title,
            text,
            id: Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
        };
    
        // Getting existing notes first
        fs.readFile('./db/db.json', 'utf8', (error, data) => {
            if(error) {
                console.log(error)
            } else {

                const parsedNotes = JSON.parse(data)

                parsedNotes.push(newNote)
        
                fs.writeFile('./db/db.json', JSON.stringify(parsedNotes), (error) => {
                    if(error){
                        console.log(error)
                    } else {
                        console.log(`Note has been written`)
                    }
                })

            }
        })    



    }

})

// Listening for application
app.listen(PORT, () => {
    console.log(`Note Taker app is listening on PORT ${PORT}`)
})