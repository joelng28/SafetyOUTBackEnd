const User = require('../models/user');
const Assistance = require('../models/assistance');
const  Mongoose  = require('mongoose');


exports.postAssistance = (req, res, next) => {

    const user_id = req.body.user_id;
    const latitude = req.body.place.latitude;
    const longitude = req.body.place.longitude;
    const dateTime = req.body.dateTime;


    User.findById(user_id)
    .then(result => {
        if(result){
            Assistance.find({user_id: Mongoose.Types.ObjectId(user_id)})
            .then(currentAssistances => {
              
                for(var i = 0; i < currentAssistances.length; i++){
                    if(currentAssistances[i].place.latitude === latitude && currentAssistances[i].place.longitude === longitude){
                        if(currentAssistances[i].dateTime === dateTime){
                            res.status(409).json({message:"An assistance in this place with this user at this time already exists"});
                            const error = new Error();
                            error.statusCode = 409;
                            throw error;
                        }
                    }
                }

                const assistance = new Assistance({
                    user_id: Mongoose.Types.ObjectId(user_id),
                    place: req.body.place,
                    dateTime: dateTime,
                    num_hours: req.body.num_hours
                });

                assistance.save()
                .then(result =>{
                    res.status(201).json({message:"A new assistance record has been added"});
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
        else
            res.status(409).json({message:"The user_id is not correct"});
    })
};


