const Place = require('../models/place');
const jwt = require("jsonwebtoken");
const Assistance = require('../models/assistance');

exports.notifyAssistance = (req, res, next) => {

    let loadedUser;

    //if notify && error
    res.status(404).json({message: "We could not notify your assistance in this site, try again later"});
    const error = new Error("We could not notify your assistance in this site, try again later");
    error.statusCode = 404;
    throw error;
    //else 
    /*
    res.status(200).json({message: "We have notified your assistance in this site!"});
    numNotified++;


    */
    
}

exports.checkActualCapacity = (req, res, next) => {

    //acció de veure l'afor actual
    res.status(404).json({message: "At this moment we cannot tell you the capacity of this place, try again later"});
    const error = new Error("At this moment we cannot tell you the capacity of this place, try again later");
    error.statusCode = 404;
    throw error;

    //si ho veiem
     /*
    res.status(200).json({message: "The capacity of this place is X"});


    */

}

