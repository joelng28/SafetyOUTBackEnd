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
        {user_id_request: Mongoose.Types.ObjectId(user_id_request)},
        {user_id_requested: Mongoose.Types.ObjectId(user_id_requested)}
        ]
    })
    .then(request => {
        if (!request) {
                res.status(404).json({message:"A friend request between this two users does not exist"});
                const error = new Error();
                error.statusCode = 404;
                throw error;
        }
        request.remove()
            .then(result => {
                //Model amistad? quantitat amics..
                Promise.all([
                    User.findById(user_id_request),
                    User.findById(user_id_requested)
                ]).then(([request, requested]) => {
                    request.friends.push({userId:requested});
                    requested.friends.push({userId: request});

                    Promise.all([
                        request.update(),
                        requested.update()
                    ]).then(function(){
                        res.status(200).json({message:"User added to friends"});
                    })
                    .catch(err=>{
                        if(!err.statusCode){
                            err.statusCode = 500;
                        }
                        next(err);
                    });
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
    
}

exports.getFriendRequest = (req, res, next) => {
    
}