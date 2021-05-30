const User = require('../models/user');
const Bubble = require('../models/bubble');
const BubbleInvitation = require('../models/bubbleInvitation');
const  Mongoose  = require('mongoose');



exports.createBubble = (req, res, next) => {
    const bubble_name = req.body.bubble_name;
    const user_id=req.body.user_id;
    User.findOne({_id: user_id})
    .then(user => {
            if(user){
                Bubble.findOne({
                    $and:[
                        {admin: user_id},
                        {name: bubble_name}
                    ]
                })
                .then(bubble => {
                    if(bubble) {
                        res.status(409).json({message: 'This user already administrates another bubble with this name'});
                    }
                    else {
                        const newbubble= new Bubble({
                            name: bubble_name,
                            admin: user_id,
                            members: [
                                {userId:user_id}
                            ]
                        })
                        newbubble.save()
                        .then(result =>{
                         res.status(201).json({message: 'Bubble created!', bubble_id: newbubble._id.toString()});
                        })
                    .catch(err => {
                        if(!err.statusCode){
                            err.statusCode = 500;
                        }
                        next(err);
                    }); 
                    }
                })
            }
            else{
                res.status(404).json({message: 'A user with this id does not exist'});
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


exports.deleteBubble = (req, res, next) => {
    const bubble_id = req.body.bubble_id;
    
    Bubble.findById(bubble_id)
    .then(bubble => {
        if(!bubble) {
            res.status(404).json({message: 'This bubble does not exist'});
        }
        else {
            //BubbleInvitation.DeleteMany({bubble_name:bubble_name})
            //.then(result =>{
                bubble.delete()
                .then(result =>{
                res.status(200).json({message: 'Bubble deleted!'});
                })
            //})
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        }); 
        }
    })   
}

exports.modifyBubble = (req, res, next) => {
    bubble_id = req.body.bubble_id;
    bubble_new_name = req.body.bubble_new_name;
    bubble_new_admin = req.body.bubble_new_admin;
    const update = { 
        "name": bubble_new_name,
        "admin": bubble_new_admin
    };
    Bubble.findByIdAndUpdate(bubble_id,update)
    .then(bubble => {
        if(!bubble) {
            res.status(404).json({message: 'This user does not administrate a bubble with this name'});
        }
        else {
           res.status(201).json({message: 'Bubble updated!'});
        }
    })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
         });
}


