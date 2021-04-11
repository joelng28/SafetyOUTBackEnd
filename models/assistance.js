const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assistanceSchema = new Schema(
    {
        user_id:{
            type: Schema.ObjectId 
        },
        place_id:{
            type: Schema.ObjectId
        },
        dateTime:{
            type:String,
            required:true
        },
        num_hours:{
            type:Number,
            required: true
        },        
    },
    {timestamps:true}
);

module.exports = mongoose.model("Assistance", assistanceSchema);