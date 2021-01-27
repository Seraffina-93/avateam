const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const {User, validateUser} = require('../models/user');
const express = require('express');
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const editor = require('../middleware/editor');
const router = express.Router();

router.post('/', async (req, res) => {
    const {error} = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).send('User already registered');

    user = new User (_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    //envía al cliente solo los datos del usuario nuevo
    //res.send(_.pick(user, ['_id', 'name', 'email']));

    //envía al cliente los datos pero además el usuario nuevo está logueado por defecto.
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email', 'role']));

});

router.put('/:id', [auth, admin], async (req, res) => {
    const { error } = validateUser(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    const salt = await bcrypt.genSalt(10);

    const user = await User.findByIdAndUpdate(req.params.id, 
        {name: req.body.name, 
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, salt),
            role: req.body.role 
        }, 
        { new: true });
    
    if (!user) return res.status(404).send('The user with the given ID was not found.');
    
    res.send(user);
  });

router.delete('/:id', [auth, admin], async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.id);
    
    if (!user) return res.status(404).send('The user with the given ID was not found.');
  
    res.send(user);
  });


module.exports = router;