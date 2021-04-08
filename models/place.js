const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const placeSchema = new Schema(
    {
        id_espai:{
            type:String,
            required:true
        },
        type_espai:{
            type: String,
        },
        city:{
            type:String,
            required: true
        },
        postal_code:{
            type:String,
            required:true
        },
        adress:{
            type:String,
            required:true
        },
        description_space:{
            type:String,
            required:true
        },
        max_capacity:{
            type:Intl,
            required:true
        },
        hora_apertura:{
            type:Date, //hour
            required:true
        },  
        hora_tancament:{
            type:Date, //hour
            required:true
        }      
    },
    {timestamps:true}
);

userSchema.method('numAssistents', async function(unhashed) {
    
})



module.exports = mongoose.model("Place", placeSchema);