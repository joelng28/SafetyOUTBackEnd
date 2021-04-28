const User = require('../models/user');
const Assistance = require('../models/assistance');
const  Mongoose  = require('mongoose');
const { Assertion } = require('chai');


exports.postAssistance = (req, res, next) => {

    const user_id = req.body.user_id;
    const latitude = req.body.place.latitude;
    const longitude = req.body.place.longitude;
    const dateTime = req.body.dateTime;



    User.findById(user_id)
    .then(user => {
        if(user){
            Assistance.findOne({user_id: Mongoose.Types.ObjectId(user_id), place: {longitude: longitude, latitude: latitude}})
            .then(assistanceFound => {
              
                if(assistanceFound){
                    res.status(409).json({message:"An assistance in this place with this user at this time already exists"});
                    const error = new Error();
                    error.statusCode = 409;
                    throw error;
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


exports.deleteAssistance = (req, res, next) => {

    const userId = req.body.user_id;
    const place = req.body.place;
    

    Assistance.findOne({user_id: Mongoose.Types.ObjectId(userId), place: {longitude: place.longitude, latitude: place.latitude}})
        .then(assistance => {
            if(!assistance){
                res.status(404).json({message:"An assistance in this place with this user could not be found"});
                const error = new Error();
                error.statusCode = 404;
                throw error;
            }

            assistance.remove()
                .then(result => {
                    res.status(200).json({message:"The assistance was successfully deleted"});
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

exports.getNumAssistencies = (req, res, next) => {
    
    const place = req.body.place;
    const latitude = req.body.place.latitude;
    const longitude = req.body.place.longitude;
    const dateTime = req.body.dateTime;
    const hourTime = req.body.hourTime;

   
    Assistance.find ({place: {longitude: place.longitude, latitude: place.latitude}, data: dateTime, hour: hourTime})





}

