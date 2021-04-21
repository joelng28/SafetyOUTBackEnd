const User = require('../models/user');
const Assistance = require('../models/assistance');
const  Mongoose  = require('mongoose');


exports.postAssistance = (req, res, next) => {

    const user_id = req.body.user_id;
    const latitude = req.body.place.latitude;
    const longitude = req.body.place.longitude;
    const startDateJSON = req.body.dateInterval.startDate;
    const endDateJSON = req.body.dateInterval.endDate;


    const startDate = new Date(
        startDateJSON.year,
        startDateJSON.month,
        startDateJSON.day,
        startDateJSON.hour,
        startDateJSON.minute,
        "0"
    );

    User.findById(user_id)
    .then(user => {
        if(user){
            Assistance.findOne({
                $and: [
                    {"user_id": Mongoose.Types.ObjectId(user_id)}, 
                    {"place": {longitude: longitude, latitude: latitude}},
                    {"dateInterval.startDate": startDate}
                ]
            })
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
                    dateInterval:{
                        startDate: new Date(startDateJSON.year, startDateJSON.month, startDateJSON.day, startDateJSON.hour, startDateJSON.minute, 0),
                        endDate: new Date(endDateJSON.year, endDateJSON.month, endDateJSON.day, endDateJSON.hour, endDateJSON.minute, 0)
                    }
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

exports.consultFutureAssistance = (req, res, next) => {

    const user_id = req.body.user_id;

  
    User.findById(user_id)
    .then(user => {
        if(user){
            Assistance.find({user_id: Mongoose.Types.ObjectId(user_id)})
            .then(currentAssistances => {
                if(currentAssistances.length==0) res.status(400).json({message:"The user has no future assistances"});
                res.status(201).json({message:currentAssistances});
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

exports.consultAssistanceOnDate = (req,res,next) => {
    
    const user_id = req.body.user_id;
    const dateTime = req.body.dateTime;

    User.findById(user_id)
    .then(user => {
        if(user){
            Assistance.find({user_id: Mongoose.Types.ObjectId(user_id),dateTime: dateTime})
            .then(currentAssistances => {
                if(currentAssistances.length==0) res.status(400).json({message:"The user has no assistances on this date"});
                res.status(201).json({message:currentAssistances});
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
}

exports.modifyAssistance = (req,res,next) => {
    const userId = req.body.user_id;
    const place = req.body.place;
    const num_hours_new= req.body.num_hours;
    const dateTime_new=req.body.dateTime;

    const filter = {user_id: Mongoose.Types.ObjectId(userId), place: {longitude: place.longitude, latitude: place.latitude}};
    const update = { 
        num_hours: num_hours_new,
        dateTime: dateTime_new
    };
    Assistance.findOneAndUpdate(filter,update)
    .then(assistance => {
        if(!assistance){
            res.status(404).json({message:"An assistance in this place with this user could not be found"});
            const error = new Error();
            error.statusCode = 404;
            throw error;
        }
        res.status(201).json({message:"Modified correctly"});
    })
    .catch(err=>{
        if(!err.statusCode){
          err.statusCode = 500;
     }
        next(err);
    });
}

exports.deleteAssistance = (req, res, next) => {

    const userId = req.body.user_id;
    const place = req.body.place;
    const startDateJSON = req.body.dateInterval.startDate;

    const startDate = new Date(
        startDateJSON.year,
        startDateJSON.month,
        startDateJSON.day,
        startDateJSON.hour,
        startDateJSON.minute,
        "0"
    );
    Assistance.findOne({
        $and: [
            {"user_id": Mongoose.Types.ObjectId(userId)}, 
            {"place": {longitude: place.longitude, latitude: place.latitude}},
            {"dateInterval.startDate": startDate}
        ]
        })
        .then(assistance => {
            if(!assistance){
                res.status(404).json({message:"An assistance in this place at this time with this user could not be found"});
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




