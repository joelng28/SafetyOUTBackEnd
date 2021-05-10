const User = require('../models/user');
const BubbleInvitation = require('../models/bubbleInvitation');
const Bubble = require('../models/bubble');
const  Mongoose  = require('mongoose');
const bubbleInvitation = require('../models/bubbleInvitation');

exports.postInvitation = (req, res, next) => {
    const invitee_id = req.body.invitee_id;
    const bubble_id = req.body.bubble_id;
    const invited_by_id = req.body.invited_by_id;

    Promise.all([
        User.findById(invitee_id),
        User.findById(invited_by_id),
        Bubble.findById(bubble_id)
    ]).then(([invitee, invitedBy, bubble]) => {
        if(!invitee || !invitedBy || !bubble){
            let errorMsg;
            if(!invitee)errorMsg = "The invited user does not exist";
            else if(!invitedBy) errorMsg = "The inviting user does not exist";
            else if(!bubble)errorMsg = "The bubble does not exist";

            res.status(404).json({message:errorMsg});
            const error = new Error();
            error.statusCode = 404;
            throw error;
        }

        let bubbleInvitation = new BubbleInvitation({
            invitee_id: Mongoose.Types.ObjectId(invitee_id),
            bubble_id: Mongoose.Types.ObjectId(bubble_id),
            invited_by_id: Mongoose.Types.ObjectId(invited_by_id)
        })

        bubbleInvitation.save()
        .then(result => {
            res.status(201).json({message:"A new bubble invitation record has been added"});
        })
        .catch(err=>{
            if(!err.statusCode){
              err.statusCode = 500;
         }
            next(err);
        });

    })
    .catch(err=>{
        if(!err.statusCode){
          err.statusCode = 500;
     }
        next(err);
    });

}

exports.acceptInvitation = (req, res, next) => {
    const user_id = req.body.invitee_id;
    const bubble_id = req.body.bubble_id;
    const invitedBy = req.body.invited_by_id;
    BubbleInvitation.findOne({
        $and:[
            {invitee_id: Mongoose.Types.ObjectId(user_id)},
            {bubble_id: Mongoose.Types.ObjectId(bubble_id)},
            {invited_by_id: Mongoose.Types.ObjectId(invitedBy)}
        ]
        })
        .then(BubbleInvitation => {
            if(!BubbleInvitation){
                res.status(404).json({message:"An invitation for this user to this bubble does not exist"});
                const error = new Error();
                error.statusCode = 404;
                throw error;
            }
            BubbleInvitation.remove()
                .then(result => {
                    Bubble.findById(bubble_id)
                        .then(bubble => {
                            if(bubble) {
                                if(UserInArray(bubble.members,'userId',user_id)) {
                                    res.status(404).json({message:"This user is already a member of this bubble"});
                                    const error = new Error();
                                    error.statusCode = 404;
                                    throw error;
                                }
                                bubble.members.push({userId:user_id});
                                bubble.save()
                                    .then(result => {
                                        res.status(200).json({message:"User added to bubble"});
                                    })
                                    .catch(err=>{
                                        if(!err.statusCode){
                                          err.statusCode = 500;
                                     }
                                        next(err);
                                    });
                            }
                            else {
                                res.status(200).json({message:"This bubble does no longer exist"});
                            }
                        })
                        .catch(err=>{
                            if(!err.statusCode){
                              err.statusCode = 500;
                         }
                            next(err);
                        });
                })
                .catch(err=>{
                    if(!err.statusCode){
                      err.statusCode = 500;
                 }
                    next(err);
                });
        })
        .catch(err=>{
            if(!err.statusCode){
              err.statusCode = 500;
         }
            next(err);
        });
}

function UserInArray(array,userId,id) {
    if(array.length>0) {
        for(i in array) {
            if(array[i][userId]==id) return true;
        }
    }
    return false;
}

exports.denyInvitation = (req, res, next) => {
    const user_id = req.body.invitee_id;
    const bubble_id = req.body.bubble_id;
    const invitedBy = req.body.invited_by_id;
    BubbleInvitation.findOne({
        $and:[
            {invitee_id: Mongoose.Types.ObjectId(user_id)},
            {bubble_id: Mongoose.Types.ObjectId(bubble_id)},
            {invited_by_id: Mongoose.Types.ObjectId(invitedBy)}
        ]
        })
        .then(BubbleInvitation => {
            if(!BubbleInvitation){
                res.status(404).json({message:"An invitation for this user to this bubble does not exist"});
                const error = new Error();
                error.statusCode = 404;
                throw error;
            }
            BubbleInvitation.remove()
                .then(result => {
                    res.status(200).json({message:"User added to bubble"});
                })
                .catch(err=>{
                    if(!err.statusCode){
                      err.statusCode = 500;
                 }
                    next(err);
                });
        })
        .catch(err=>{
            if(!err.statusCode){
              err.statusCode = 500;
         }
            next(err);
        });
}

exports.getInvitation = (req, res, next) => {
    
}
