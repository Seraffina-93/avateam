const mongoose = require('mongoose');
const Joi = require('joi');

const Project = mongoose.model('Project', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    client: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    meetings: {
        type: String
    },
    contact: {
        type: String
    },
    notes: {
        type: String
    }
}));

function validateProject(project) {
    const schema = Joi.object({
      name: Joi.string().min(5).required(),
      client: Joi.string().min(5).required(),
      meetings: Joi.string(),
      contact: Joi.string(),
      notes: Joi.string()
    });
  
    return schema.validate(project);
  }

exports.Project = Project;
exports.validateProject = validateProject;