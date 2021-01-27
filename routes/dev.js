const {Dev, validateDev} = require('../models/dev');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const editor = require('../middleware/editor');
const router = express.Router();


router.get('/', auth, async (req, res) => {
    const devs = await Dev.find().sort('name');
    res.send(devs);
});

router.post('/', [auth, editor], async (req, res) => {
    const {error} = validateDev(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    let dev = new Dev({
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        degree: req.body.degree,
        calendar: req.body.calendar,
        english: req.body.english,
        programLang: req.body.programLang,
        technologies: req.body.technologies
    });
    dev = await dev.save();
    
    res.send(dev);
});

router.put('/:id', [auth, editor], async (req, res) => {
    const { error } = validateDev(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    const dev = await Dev.findByIdAndUpdate(req.params.id, 
        {name: req.body.name, 
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        degree: req.body.degree,
        calendar: req.body.calendar,
        english: req.body.english,
        programLang: req.body.programLang,
        technologies: req.body.technologies}, 
        { new: true });
    
    if (!dev) return res.status(404).send('The dev with the given ID was not found.');
    
    res.send(dev);
  });

router.delete('/:id', [auth, admin], async (req, res) => {
    const dev = await Dev.findByIdAndRemove(req.params.id);
    
    if (!dev) return res.status(404).send('The dev with the given ID was not found.');
  
    res.send(dev);
  });
  
  router.get('/:id', auth, async (req, res) => {
    const dev = await Dev.findById(req.params.id);

    if (!dev) return res.status(404).send('The dev with the given ID was not found.');
    
    res.send(dev);
  });


module.exports = router;
