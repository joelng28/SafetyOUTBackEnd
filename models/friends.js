const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FriendsSchema = new Schema(
    {
        user_id:{
            type: String,
            required:true
        },
        friends:[
            {userId: Schema.ObjectId}
        ]
    },
    {timestamps:true}
);


module.exports = mongoose.model("Friends", FriendsSchema);