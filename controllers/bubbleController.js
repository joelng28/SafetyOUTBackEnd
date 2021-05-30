const User = require('../models/user');
const Bubble = require('../models/bubble');
const BubbleInvitation = require('../models/bubbleInvitation');
const  Mongoose  = require('mongoose');
const { update } = require('../models/user');



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
            
                bubble.delete()
                .then(result =>{
                res.status(200).json({message: 'Bubble deleted!'});
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

exports.deleteBubbleContact = (req, res, next) => {
    const bubbleId = req.body.bubbleId;
    const user_id=req.body.user_id;
    const user_id2=req.body.user_id_delete;

    User.findOne({_id: user_id})
    .then(user => {
        if(user){
            Bubble.findOneAndUpdate(
                {"_id": bubbleId, "admin": user_id},
                {$pull: {members: {userId: user_id2}}}
            )
            .then(function(){
                User.findOneAndUpdate(
                    {"_id": user_id2},
                    {$pull: {bubbles: {bubbleId: bubbleId}}}
                )
                .then(function(){
                    res.status(200).json({message: 'Completed!'});
                })

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

exports.leaveBubble = (req, res, next) => {
    const bubbleId = req.body.bubbleId;
    const user_id=req.body.user_id;
    User.findOne({_id: user_id})
    .then(user => {
            if(user){
                Bubble.findOneAndUpdate(
                    {"_id": bubbleId},
                    {$pull: {members: {userId: user_id}}}
                )
                .then(function(){
                    User.findOneAndUpdate(
                        {"_id": user_id},
                        {$pull: {bubbles: {bubbleId: bubbleId}}}
                    )
                    .then(function(){
                        res.status(200).json({message: 'Completed!'});
                    })

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
