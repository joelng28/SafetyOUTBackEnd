const User = require('../models/user');
const BubbleInvitation = require('../models/bubbleInvitation');
const  Mongoose  = require('mongoose');

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
    
}

exports.denyInvitation = (req, res, next) => {
    
}

exports.getInvitation = (req, res, next) => {
    
}
