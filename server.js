const { response } = require('express');
const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const notes = require('./db/db.json')
console.log(notes);

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static(__dirname + '/public'))

app.use(express.json());

app.get('/api/notes', (req, res) => {
    let results = notes;
    res.json(results);
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.post('/api/notes', (req, res) => {
    const newNote = { text: req.body.text, title: req.body.title, id: uuidv4() }
    notes.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    res.json(notes);
    // console.log(newNote);
})

app.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    const savedNotes = notes.filter(note => note.id !== id);
    console.log(savedNotes);
    fs.writeFileSync('./db/db.json', JSON.stringify(savedNotes));

    return res.send();
})

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/index.html'))
// })

app.listen(PORT, () => {
    console.log(`API server now listening on port ${PORT}!`);
})