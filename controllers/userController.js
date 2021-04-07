const User = require('../models/user');
const jwt = require("jsonwebtoken");


exports.checkEmail = (req,res,next) => {

    User.findOne({email: req.params.email})
    .then(user => {
            if(user){

                res.status(409).json({message:'The email is already being used'});

                const error = new Error("The email is already being used");
                error.statusCode = 409;
                throw error;
            }
            else{
                res.status(200).json({message: 'The email has not been used yet'});
            }
        }
    )
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }); 
}


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
                const birthdayArray = req.body.birthday.slice("-");
                const day = birthdayArray[2];
                const month = birthdayArray[1];
                const year = birthdayArray[0];

                const user = new User({
                    name: req.body.name,
                    surnames: req.body.surnames,
                    email: req.body.email,
                    password: req.body.password,
                    birthday: new Date(year, month, day),
                    gender: req.body.gender,
                    profileImage: req.body.profileImage
                });
            
                user.save()
                    .then(result =>{
                        const token = jwt.sign({email: result.email, userId: result._id.toString()}, process.env.JWT_SECRET);
                        res.status(201).json({token: token, message: 'User created!', userId: result._id.toString()});
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
                const token = jwt.sign({email: loadedUser.email, userId: loadedUser._id.toString()}, process.env.JWT_SECRET);
                res.status(200).json({token: token, message: "Logged In correctly!", userId: loadedUser._id.toString()});
            }
        })
        .catch(err => {
            if(!err.statusCode)err.statusCode=500;
            next(err);
        });
}

exports.getUserInfo = (req, res, next) => {

    let loadedUser;

    User.findById(req.params.userId) 
        .then(user => {
            if(!user){
                res.status(404).json({message: "A user with this id could not be found"});
                const error = new Error("A user with this id could not be found");
                error.statusCode = 404;
                throw error;
            }
            else{
                loadedUser = user;
                console.log(loadedUser);
                res.status(200).json({user:loadedUser});
            }
        })
        .catch(err => {
            if(!err.statusCode)err.statusCode=500;
            next(err);
        });       
}

exports.notifyAssistance = (req, res, next) => {

    let loadedUser;

    //if notify 
    res.status(404).json({message: "We could not notify your assistance in this site, try again later"});
    const error = new Error("We could not notify your assistance in this site, try again later");
    error.statusCode = 404;
    throw error;
    //else 
    /*
    res.status(200).json({message: "We have notified your assistance in this site!"});


    */
    
}

exports.checkActualCapacity = (req, res, next) => {

    //acció de veure l'afor actual
    res.status(404).json({message: "At this moment we cannot tell you the capacity of this place, try again later"});
    const error = new Error("At this moment we cannot tell you the capacity of this place, try again later");
    error.statusCode = 404;
    throw error;

    //si ho veiem
     /*
    res.status(200).json({message: "The capacity of this place is X"});


    */

}

