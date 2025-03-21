const express = require('express');
const { getNotes, createNote, updateNote } = require('../controllers/noteController');

const router = express.Router();

router.route('/').get(getNotes).post(createNote);
router.route('/:id').put(updateNote);

module.exports = router;
