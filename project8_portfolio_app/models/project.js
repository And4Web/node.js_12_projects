const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  client: {type: String, required: true},
  service: {type: String, required: true},
  url: {type: String, required: true},
  date: {type: Date, default: Date.now()},
},{
  timestamps: true
});


const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;