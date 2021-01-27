const {Project, validateProject} = require('../models/project');
const auth = require('../middleware/auth');
const express = require('express');
const editor = require('../middleware/editor');
const admin = require('../middleware/admin');
const router = express.Router();

router.get('/', auth, async (req, res) => {
    const projects = await Project.find().sort('name');
    res.send(projects);
});

router.post('/', [auth, editor], async (req, res) => {
    const {error} = validateProject(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    let project = new Project({
        name: req.body.name,
        client: req.body.client,
        meetings: req.body.meetings,
        contact: req.body.contact,
        notes: req.body.notes
    });
    project = await project.save();
    
    res.send(project);
});

router.put('/:id', [auth, editor], async (req, res) => {
    const { error } = validateProject(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    const project = await Project.findByIdAndUpdate(req.params.id, {
        name: req.body.name, 
        client: req.body.client,
        meetings: req.body.meetings,
        contact: req.body.contact,
        notes: req.body.notes}, 
        { new: true }
    );
    
    if (!project) return res.status(404).send('The project with the given ID was not found.');
    
    res.send(project);
  });

router.delete('/:id', [auth, admin], async (req, res) => {
    const project = await Project.findByIdAndRemove(req.params.id);
    
    if (!project) return res.status(404).send('The project with the given ID was not found.');
  
    res.send(project);
  });
  
  router.get('/:id', auth, async (req, res) => {
    const project = await Project.findById(req.params.id);

    if (!project) return res.status(404).send('The project with the given ID was not found.');
    
    res.send(project);
  });


module.exports = router;
