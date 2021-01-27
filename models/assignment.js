const mongoose = require('mongoose');
const Joi = require('joi');


const Assignment = mongoose.model('Assignment', new mongoose.Schema({
    dev: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dev'
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project'
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    role: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    techs: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 250
    },
    feedback: {
        type: String,
    }
}));



function validateAssignment(assignment) {
    const schema = Joi.object({
        dev: Joi.string(),
        project: Joi.string(),
        startDate: Joi.date(),
        endDate: Joi.date(),
        role: Joi.string().min(5).max(50).required(),
        techs: Joi.string().min(5).max(250).required(),
        feedback: Joi.string()
    });

    return schema.validate(assignment);    
}

exports.Assignment = Assignment;
exports.validateAssignment = validateAssignment;