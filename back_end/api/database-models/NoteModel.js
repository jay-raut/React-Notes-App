const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  notes: [{ 
    content: String, 
    createdAt: { type: Date, default: Date.now } 
  }]
});

const Notes = mongoose.model('Notes', notesSchema);

module.exports = Notes;
