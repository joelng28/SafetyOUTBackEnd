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
        dateInterval:{
            startDate: Date,
            endDate: Date
        }       
    },
    {timestamps:true}
);

module.exports = mongoose.model("Assistance", assistanceSchema);