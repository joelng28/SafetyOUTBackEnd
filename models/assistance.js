const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AssiSchema = new Schema(
    {
        data_assistencia:{
            type:Date,
            required:true
        },
        hora_asssitencia:{
            type: Date, //hour
        },
        temps_assistencia:{
            type:String,

            required: true
        },        
    },
    {timestamps:true}
);



module.exports = mongoose.model("Place", placeSchema);