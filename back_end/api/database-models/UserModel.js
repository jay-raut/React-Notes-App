const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  notesFileId: { type: Schema.Types.ObjectId, ref: 'Notes' }
});

const User = mongoose.model('User', userSchema);
module.exports = User;