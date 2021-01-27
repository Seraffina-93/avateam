const mongoose = require('mongoose');
const Joi = require('joi');


const Dev = mongoose.model('Dev', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 250,
        unique: true
    },
    phoneNumber: {
        type: String,
        minlength: 10,
        maxlength: 20
    },
    degree: {
        type: String,
        minlength: 5,
        maxlength: 250
    },
    calendar: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    english: {
        type: String,
        required: true, 
    }
    ,
    programLang: {
        type: String,
        maxlength: 1024
    },
    technologies: {
        type: String,
        maxlength: 1024
    }
}));

function validateDev(dev) {
    const schema = Joi.object({
      name: Joi.string().min(5).required(),
      email: Joi.string().min(5).max(255).required().email(),
      phoneNumber: Joi.string().min(10),
      degree: Joi.string().min(5).max(250),
      calendar: Joi.string().min(3).required(),
      english: Joi.string().min(3).required(),
      programLang: Joi.string(),
      technologies: Joi.string()
    });
  
    return schema.validate(dev);
  }

exports.Dev = Dev;
exports.validateDev = validateDev;
