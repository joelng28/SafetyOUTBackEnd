const User = require('../models/user');
const FriendRequest = require('../models/friendRequest');
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
            res.status(201).json({message:"A new friend request has been added", request_id: friendRequest.id});
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

    var request_id = req.params.id;

    FriendRequest.findById(request_id)
    .then(request => {
        if (!request) {
                res.status(404).json({message:"A friend request between this two users does not exist"});
                const error = new Error();
                error.statusCode = 404;
                throw error;
        }

        var user_id_request = request.user_id_request;
        var user_id_requested = request.user_id_requested;

        request.remove()
            .then(result => {
                //Model amistad? quantitat amics..
                Promise.all([
                    User.findOneAndUpdate(
                        {"_id": user_id_request},
                        {$push: {friends: {userId: user_id_requested}}}
                    ),
                    User.findOneAndUpdate(
                        {"_id": user_id_requested},
                        {$push: {friends: {userId: user_id_request}}}
                    )
                ]).then(function(){
                    res.status(200).json({message:"User added to friends"});
                })
            })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
  })
    
}

exports.denyFriendRequest = (req, res, next) => {
    
    var request_id = req.params.id;

    FriendRequest.findById(request_id)
    .then(request => {
        if (!request) {
                res.status(404).json({message:"A friend request between this two users does not exist"});
                const error = new Error();
                error.statusCode = 404;
                throw error;
        }
        request.remove()
        .then(result => {
            res.status(200).json({message:"Invitacion declined"});
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


exports.getFriendRequest = (req, res, next) => {
    
}


exports.deleteFriend = (req,res,next) => {
    user_id = req.params.id;
    friend_id = req.body.friend_id;
    User.findById(user_id)
    .then(user => {
        if(user) {
              User.findById(friend_id)
              .then( friend => {
                  if(friend) {
                      friends=containsObject(friend_id,user.friends);
                      containsObject(user_id,friend.friends);
                      if(friends) {
                      user.save()
                      .catch(err => {
                        if(!err.statusCode){
                            err.statusCode = 500;
                        }
                        next(err);
                    });
                        friend.save()
                              .then(result =>{
                                  res.status(201).json({message: "Friend deleted"});
                               })
                            .catch(err => {
                            if(!err.statusCode){
                                err.statusCode = 500;
                            }
                            next(err);
                            });
                        }
                    else res.status(404).json({message: "These users are not friends"});
                  }
                  else {
                    res.status(404).json({message: 'The friend does not exist'});
                  }
              })
        }
        else {
            res.status(404).json({message: 'The user does not exist'});
        }
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
}

function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].userId == obj) {
            list.splice(i,1)
            return true;
        }
    }

    return false;
}