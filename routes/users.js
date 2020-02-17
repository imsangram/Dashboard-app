const express = require('express');
const router = express.Router();
const User = require('../model/User');

router.get('/', async (req,res)=>{
    try {
        const users = await User.find();
        res.send(users);
    }
    catch(err){
        res.json(err);
    }
});

router.post('/', async (req,res) => {
    const user = new User({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        age : req.body.age
    });

    try {
        const savedUser = await user.save();
        res.send(savedUser);
    }
    catch(err){
        res.json({ message: 'something went wrong ..' + err});
    }
});


router.get('/:id', async (req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        if(user == null){
            res.status(404).json({ message: 'User could not be found'});
        }
        res.json(user);
    }
    catch(err){
        res.json({ message: 'something went wrong ..' + err});
    }
});


router.delete('/:id', async (req,res)=>{
    try {
        const deletedUser = await User.remove({_id: req.params.id});
        res.json(deletedUser);
    }
    catch(err){
        res.json({ message: 'something went wrong ..' + err});
    }
});


router.patch('/:id', async (req,res)=>{
    try {
        const updatedUser  = await User.updateOne({_id: req.params.id},{ $set: { firstName: req.body.firstName, lastName: req.body.lastName}});
        res.json(updatedUser);
    }
    catch(err){
        res.json({ message: 'something went wrong ..'+ err});
    }
});


module.exports = router;