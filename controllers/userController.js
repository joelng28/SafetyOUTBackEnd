const User = require('../models/user');
const Bubble = require('../models/bubble');
const FriendRequest = require('../models/friendRequest');
const BubbleInvitation = require('../models/bubbleInvitation');
const Chat = require('../models/chat');
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

exports.getUserId = (req, res, next) => {

    var user_email = req.query.email;
    User.findOne({email: user_email})
    .then(user => {
        res.status(200).json({id: user.id});
    })
}


exports.getUserInfo = (req, res, next) => {

    let loadedUser;

    User.findById(req.params.id) 
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


exports.getUserFriends = (req,res, next) => {
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
                res.status(200).json({message:loadedUser.friends});
            }
        })
        .catch(err => {
            if(!err.statusCode)err.statusCode=500;
            next(err);
        });       
}

exports.getUserBubbles = (req, res, next) => {

    var user_id = req.params.id;
    Bubble.find({"members.userId": user_id})
    .then(bubbles => {
        res.status(200).json({bubbles: bubbles});
    })
    .catch(err=>{
        if(!err.statusCode){
          err.statusCode = 500;
     }
        next(err);
    });
}

exports.getUserFriendRequests = (req, res, next) => {

    var user_id = req.params.id;
    FriendRequest.find({user_id_requested: user_id})
    .then(friendRequests => {
        res.status(200).json({friendRequests: friendRequests});
    })
    .catch(err=>{
        if(!err.statusCode){
          err.statusCode = 500;
     }
        next(err);
    });
}

exports.getUserBubbleInvitations = (req, res, next) => {

    var user_id = req.params.id;
    BubbleInvitation.find({invitee_id: user_id})
    .then(bubbleInvitations => {
        res.status(200).json({bubbleInvitations: bubbleInvitations});
    })
    .catch(err=>{
        if(!err.statusCode){
          err.statusCode = 500;
     }
        next(err);
    });
}

exports.getUserChats = (req, res, next) => {

    var user_id = req.params.id;
    Chat.find({
        $or:[
            {user1_id: user_id},
            {user2_id: user_id}
        ]
    })
    .then(chats => {
        res.status(200).json({chats: chats});
    })
    .catch(err=>{
        if(!err.statusCode){
          err.statusCode = 500;
     }
        next(err);
    });
}

exports.logInTerceros = (req, res, next) => {

    let loadedUser;

    User.findOne({email:req.body.email})
        .then(user => {
            if(!user){
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
            else{
                loadedUser = user;
            }
        })
        .then(isEqual => {
            const token = jwt.sign({email: loadedUser.email, userId: loadedUser._id.toString()}, process.env.JWT_SECRET);
            res.status(200).json({token: token, message: "Logged In correctly!", userId: loadedUser._id.toString()});
            }
        )
        .catch(err => {
            if(!err.statusCode)err.statusCode=500;
            next(err);
        });
}




