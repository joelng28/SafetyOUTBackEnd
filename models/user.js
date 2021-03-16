const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        name:{
            type:String,
            required:true
        },
        surnames:{
            type: String,
            required:true
        },
        email:{
            type:String,
            required: true
        },
        password:{
            type:String,
            required:true
        },
        birthday:{
            type:Date,
            required:true
        },
        gender:{
            type:String,
            required:true
        },
        profileImage:{
            type:String,
            required:true
        }        
    },
    {timestamps:true}
);

userSchema.method('validPassword', async function(unhashed) {
    const user=this;
    return await bcrypt.compare(unhashed,user.password);
})

module.exports = mongoose.model("User", userSchema);