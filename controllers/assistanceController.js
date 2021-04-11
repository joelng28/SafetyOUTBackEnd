const Place = require('../models/place');
const User = require('../models/user');
const Assistance = require('../models/assistance');
const { Mongoose } = require('mongoose');
const place = require('../models/place');

exports.postAssistance = (req, res, next) => {

    const user_id = req.body.user_id;
    const place_id = req.body.place_id;

    if(User.findById(user_id) && Place.findById(place_id)){

        const assistance = new Assistance({
            user_id: Mongoose.Types.ObjectId(user_id),
            place_id: Mongoose.Types.ObjectId(place_id),
            dateTime: req.body.dateTime,
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
    }
    else{
        res.status(409).json({message:"Either the user_id or the place_id is not correct"});
    }
};


