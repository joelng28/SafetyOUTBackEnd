const User = require('../models/user');
const Bubble = require('../models/bubble');
const  Mongoose  = require('mongoose');


exports.createBubble = (req, res, next) => {
    const bubble_name = req.body.bubble_name;
    const user_id=req.body.id;
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
                        res.status(201).json({message: 'This user already administrates another bubble with this name'});
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
                         res.status(201).json({message: 'Bubble created!'});
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
                res.status(200).json({message: 'A user with this id does not exist'});
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
    const bubble_name = req.body.bubble_name;
    const user_id=req.body.id;
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
                    if(!bubble) {
                        res.status(201).json({message: 'There is not a bubble with this name administred by this user'});
                    }
                    else {
                        bubble.delete()
                        .then(result =>{
                            res.status(201).json({message: 'Bubble deleted!'});
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
                res.status(200).json({message: 'A user with this id does not exist'});
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