const User = require('../models/user');
const Bubble = require('../models/bubble');
const BubbleChat = require('../models/bubbleChat');
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

                            var bubbleChat = new BubbleChat({
                                bubble_id: newbubble._id
                            })

                            bubbleChat.save()
                            .then(function(){
                                if(!user.trophies.includes(28)){
                                    User.findOneAndUpdate(
                                        {"_id": user_id},
                                        {$push: {trophies: 28}}
                                    )
                                    .then(function(){
                                        res.status(201).json({message: 'Bubble created!', bubble_id: newbubble._id.toString(), trophy:28});
                                    })
                                }
                                else
                                    res.status(201).json({message: 'Bubble created!', bubble_id: newbubble._id.toString(), trophy:-1});
                            })
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
    const bubble_id = req.params.id;
    
    Bubble.findById(bubble_id)
    .then(bubble => {
        if(!bubble) {
            res.status(404).json({message: 'This bubble does not exist'});
        }
        else {
            BubbleChat.findOneAndDelete({bubble_id: bubble_id})
            .then(function(){
                bubble.delete()
                .then(function(){
                    res.status(200).json({message: 'Bubble deleted!'});
                })
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


exports.getBubble = (req, res, next) => {

    var bubble_id = req.params.id;

    Bubble.findById(bubble_id)
    .then(bubble => {
        if(!bubble){
            res.status(404).json({message: 'This bubble does not exist'});
        }
        res.status(200).json({bubble: bubble});
    })
}

exports.modifyBubble = (req, res, next) => {
    bubble_id = req.params.id;
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
           res.status(200).json({message: 'Bubble updated!'});
        }
    })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
         });
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


