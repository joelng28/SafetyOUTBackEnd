const User = require('../models/user');
const FriendRequest = require('../models/friendRequest');
const Friends = require('../models/friends');
const  Mongoose  = require('mongoose');
const  Mongoose  = require('mongoose');

exports.postFriendRequest = (req, res, next) => {
    const user_id_request = req.body.user_id_request;
    const user_id_requested = req.body.user_id_requested;

    Promise.all([
        User.findById(user_id_request),
        User.findById(user_id_requested),
    ]).then(([request, requested]) => {
        if(!request || !requested){
            let errorMsg;
            if(!request)errorMsg = "The user that sends the friend request does not exist";
            else if(!requested) errorMsg = "The user that receives a request does not exist";
 

            res.status(404).json({message:errorMsg});
            const error = new Error();
            error.statusCode = 404;
            throw error;
        }

        let friendRequest = new FriendRequest({
            user_id_request: Mongoose.Types.ObjectId(user_id_request),
            user_id_requested: Mongoose.Types.ObjectId(user_id_requested),
            
        })

        friendRequest.save()
        .then(result => {
            res.status(201).json({message:"A new friend request has been added"});
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

exports.acceptFriendRequest = (req, res, next) => {

    const user_id_request = req.body.user_id_request;
    const user_id_requested = req.body.user_id_requested;

    FriendRequest.findOne({
        $and:[
        {user_id_request: Mongoose.Types.ObjectId(user_id)},
        {user_id_requested: Mongoose.Types.ObjectId(user_id)}
        ]
    })

    .then(FriendRequest => {
        if (!FriendRequest) {
                res.status(404).json({message:"A friend request between this two users does not exist"});
                const error = new Error();
                error.statusCode = 404;
                throw error;
        }
        FriendRequest.remove()
            .then(result => {
                //Model amistad? quantitat amics..
                Friends.findOne({_id: Mongoose.Types.ObjectId(user_id)})
                        .then(Friends => {
                            if(Friends) {
                                Friends.friends.push({userId:user_id});
                                Friends.update()
                                    .then(result => {
                                        res.status(200).json({message:"User added to friends"});
                                    })
                                    .catch(err=>{
                                        if(!err.statusCode){
                                          err.statusCode = 500;
                                     }
                                        next(err);
                                    });
                            }
                            else {
                                res.status(200).json({message:"This user does not exist"});
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

exports.denyFriendRequest = (req, res, next) => {
    
}

exports.getFriendRequest = (req, res, next) => {
    
}