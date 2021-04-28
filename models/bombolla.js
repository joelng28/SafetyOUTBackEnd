const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//usuaris que hi ha a la bombolla?
const bombollaSchema = new Schema(
    {
        bombolla_id:{
            type: Schema.ObjectId 
        },
        nom_bombolla:{
            type:String,
            required:true
        },
        photoBombolla:{
            type:String,
            required:true
        },
        max_participants: {
            type:Number,
            required: true
        },        
    },
    {timestamps:true}
);

module.exports = mongoose.model("Bombolla", bombollaSchema);