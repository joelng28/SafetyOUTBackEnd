const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assistanceSchema = new Schema(
    {
        user_id:{
            type: Schema.ObjectId 
        },
        place:{
            longitude:{
                type:String
            },
            latitude:{
                type:String
            }
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