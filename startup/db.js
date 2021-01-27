const { func } = require("joi");
const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function() {
    mongoose.connect('mongodb://localhost/avateam')
        //If we're in prod, log with winston instead of console.log
        .then(() => winston.info('Connected to MongoDB'))
        //.then(() => console.log('Connected to MongoDB'));
}