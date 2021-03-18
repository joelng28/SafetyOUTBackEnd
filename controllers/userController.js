const User = require('../models/user');

exports.signUp = (req, res, next) => {

    User.findOne({email: req.body.email})
        .then(user => {
            if(user){

                res.status(409).json({message:'The email is already being used'});

                const error = new Error("The email is already being used");
                error.statusCode = 409;
                throw error;
            }
            else{
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
            }
        })

};



exports.logIn = (req, res, next) => {

    let loadedUser;

    User.findOne({email:req.body.email})
        .then(user => {
            if(!user){
                res.status(404).json({message: "A user with this email could not be found"});
                const error = new Error("A user with this email could not be found");
                error.statusCode = 404;
                throw error;
            }
            else{
                loadedUser = user;
                return loadedUser.validPassword(req.body.password);
            }
        })
        .then(isEqual => {
            if(!isEqual){
                res.status(401).json({message: "Password is not correct!"});
                const error = new Error("Wrong password");
                error.statusCode = 401;
                throw error;
            }
            else{
                res.status(200).json({message: "Logged In correctly!", userId: loadedUser._id.toString()});
            }
        })
        .catch(err => {
            if(!err.statusCode)err.statusCode=500;
            next(err);
        });
}

exports.consultaProfile = (req, res, next) => {

    let loadedUser;

    /*
    User.findOne({email:req.body.email})
        .then(user => {
            if(!user){
                res.status(404).json({message: "A user with this email could not be found"});
                const error = new Error("A user with this email could not be found");
                error.statusCode = 404;
                throw error;
            }
            else{
                loadedUser = user;
                return loadedUser.validPassword(req.body.password);
            }
        })
        .then(isEqual => {
            if(!isEqual){
                res.status(401).json({message: "Password is not correct!"});
                const error = new Error("Wrong password");
                error.statusCode = 401;
                throw error;
            }
            else{
                res.status(200).json({message: "Logged In correctly!", userId: loadedUser._id.toString()});
            }
        })
        .catch(err => {
            if(!err.statusCode)err.statusCode=500;
            next(err);
        });
        */
}

