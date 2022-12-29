const User = require('../models/User')
const Note = require('../models/Note')
const asyncHandler = require('express-async-handler')


// @desc Get all notes
// @route GET /users
// @access Private
const getAllNotes = asyncHandler(async (req, res) => {
	// Get all notes from mongoDB
	const notes = await Note.find().lean()

	//if no notes
	if (!notes.length) {
		return res.status(400).json({ message: 'No notes found' })
	}

	//add username to each note before sending a response
	const notesWithUser = await Promise.all(notes.map(async (note) => {
		const user = await User.findById(note.user).lean().exec()
		return { ...note, username: user.username }
	}))

	res.json(notesWithUser)
})

// @desc Create new note
// @route POST /notes
// @access Private
const createNewNote = asyncHandler(async (req, res) => {
	const { user, title, text } = req.body

	// confirm data
	if(!user || !title || !text) {
		return res.status(400).json({ message: 'All fields are required' })
	}

	//check for duplicate title
	const duplicate = await Note.findOne({ title }).lean().exec()

	if(duplicate) {
		return res.status(409).json({ message: 'Note Title already existed'})
	}

	// create and store the new user
	const note = await Note.create({ user, title, text })
	if (note) { //note creation
		return res.status(201).json({ message: 'New note created' })
	} else {
		return res.status(400).json({ message: 'Invalid note data received' })
	}
})


// @desc Update a note
// @route PATCH /notes
// @access Private
const updateNote = asyncHandler(async (req, res) => {
	const { id, user, title, text, completed } = req.body

	// confirm data
	if(!id || !user || !title || !text || typeof completed !== 'boolean') {
		return res.status(400).json({ message: 'All fields are required '})
	}

	// confirm if note exists to update 
	const note = await Note.findById(id).exec()

	if(!note) {
		return res.status(400).json({ message: 'Note not found' })
	}

	// check for duplicate title 
	const duplicate = await Note.findOne({ title }).lean().exec

	// input unique title
	if(duplicate && duplicate?._id.toString() !== id) {
		return res.status(409).json({ message: 'Note Title already existed'})
	}

	note.user = user
	note.title = title
	note.text = text
	note.completed = completed

	const updatedNote = await note.save()

	res.json(`'${updatedNote.title}' updated`)
})

// @desc Delete a note
// @route DELETE /notes
// @access Private
const deleteNote = asyncHandler(async (req, res) => {
	
})