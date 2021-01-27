const {Assignment, validateAssignment} = require('../models/assignment');
const auth = require('../middleware/auth');
const editor = require('../middleware/editor');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();



router.get('/', auth, async (req, res) => {
    const assignments = await Assignment.find().sort('startDate');
    res.send(assignments);
});

router.post('/', [auth, editor], async (req, res) => {
    const {error} = validateAssignment(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    let assignment = new Assignment({
        dev: req.body.dev,
        project: req.body.project,
        startDate : req.body.startDate,
        endDate: req.body.endDate,
        role: req.body.role,
        techs: req.body.techs,
        feedback: req.body.feedback
    });
    assignment = await assignment.save();
    
    res.send(assignment);
});

router.put('/:id', [auth, editor], async (req, res) => {
    const { error } = validateAssignment(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    const assignment = await Assignment.findByIdAndUpdate(req.params.id, 
        {dev: req.body.dev,
            project: req.body.project,
            startDate : req.body.startDate,
            endDate: req.body.endDate,
            role: req.body.role,
            techs: req.body.techs,
            feedback: req.body.feedback}, 
        { new: true });
    
    if (!assignment) return res.status(404).send('The assignment with the given ID was not found.');
    
    res.send(assignment);
  });

router.delete('/:id', [auth, admin], async (req, res) => {
    const assignment = await Assignment.findByIdAndRemove(req.params.id);
    
    if (!assignment) return res.status(404).send('The assignment with the given ID was not found.');
  
    res.send(dev);
  });
  
router.get('/:id', auth, async (req, res) => {
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) return res.status(404).send('The assignment with the given ID was not found.');
    
    res.send(assignment);
  });


module.exports = router;


