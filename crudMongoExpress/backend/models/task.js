const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  deadline: Date,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { collection: 'tasks' }); // Especifica el nombre de la colección

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
