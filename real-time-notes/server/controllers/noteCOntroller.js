const Note = require('../models/noteModel');

const getNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const createNote = async (req, res) => {
    try {
        const newNote = new Note({
            content: req.body.content,
        });
        const savedNote = await newNote.save();
        res.json(savedNote);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const updateNote = async (req, res) => {
    try {
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { content: req.body.content },
            { new: true }
        );
        res.json(updatedNote);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getNotes, createNote, updateNote };
