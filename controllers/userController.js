const User = require('../models/user');

exports.signUp = (req, res, next) => {

    const user = new User({
        username: req.body.username,
        name: req.body.name,
        surnames: req.body.surnames,
        email: req.body.email,
        password: req.body.password,
        birthday: req.body.birthday,
        gender: req.body.gender,
        profileImage: req.body.profileImage
    });

    user.save()
        .then(result =>{
            res.status(201).json({message: 'User created!', userId: result._id});
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        }); 
};