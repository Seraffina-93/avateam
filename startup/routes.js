const express = require('express');
const error = require('../middleware/error');
const dev = require('../routes/dev');
const project = require('../routes/project');
const user = require('../routes/user');
const auth = require('../routes/auth');
const assignment = require('../routes/assignments');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/dev', dev);
    app.use('/api/project', project);
    app.use('/api/user', user);
    app.use('/api/auth', auth);
    app.use('/api/assignment', assignment);
    app.use(error);
}