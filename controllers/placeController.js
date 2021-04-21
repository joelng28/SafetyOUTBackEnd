const User = require('../models/user');
const Assistance = require('../models/assistance');
const  Mongoose  = require('mongoose');


exports.getOccupation = (req, res, next) => {

    var longitude = req.query.longitude;
    var latitude = req.query.latitude;

    var inputDate = new Date(
        req.query.year,
        req.query.month,
        req.query.day,
        req.query.hour,
        req.query.minute,
        "0");
   
    Assistance.find({
        $and: [
            { "place.longitude": longitude},
            { "place.latitude": latitude},
            { "dateInterval.startDate": { $lte: inputDate } },
            { "dateInterval.endDate": { $gte: inputDate } },
        ],
      }).then((assistances) => {
        res.status(200).json({occupation: assistances.length});
      })
      .catch(err=>{
        if(!err.statusCode){
          err.statusCode = 500;
     }
        next(err);
    });
}