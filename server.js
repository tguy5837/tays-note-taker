const { response } = require('express');
const express = require('express');
const path = require('path');
const fs = require('fs');

const { notes } = require('./db/db.json')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static(__dirname + '/public'))

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

app.listen(PORT, () => {
    console.log(`API server now listening on port ${PORT}!`);
})