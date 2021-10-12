const fs = require('fs');
const chalk = require("chalk");

const correctMsg = chalk.green.bold;
const errorMsg = chalk.green.bold;

const getNotes = () => console.log(loadNotes());

const addNote = function(title, body) {
    const notes = loadNotes();
    // const duplicatedNotes = notes.filter(note => note.title === title);
    const duplicatedNote = notes.find(note => note.title === title);
    
    if (!duplicatedNote) {

        notes.push({
            title,
            body
        })
        saveNotes(notes);
        console.log(correctMsg('New notes added!'));
    } else {
        console.log(errorMsg('Note title taken!'));
    }
}

const removeNote = function(title) {
    let notes = loadNotes();
    const toBeRemovedNote = notes.find(note => note.title === title);
    
    if (toBeRemovedNote) {
        notes = notes.filter(note => note.title !== title);
        saveNotes(notes);
        console.log(correctMsg('Note title removed!'));
    } else {
        console.log(errorMsg(`Notes with title ${title} cannot be found!`));
    }
}

const saveNotes = function(notes) {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = function() {

    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    
    } catch (err) {
        return [];
    }
}

const readNote = function(title) {

    const notes = loadNotes();
    const toFindNote = notes.find(note => note.title === title);

    if (toFindNote) {
        console.log(toFindNote.body);
    } else {
        console.log(errorMsg(`Notes with title ${title} cannot be found!`));
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote
}

