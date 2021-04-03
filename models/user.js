const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
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


userSchema.pre('save',async function(next) {
    const user=this; 
     const hash= await bcrypt.hash(user.password,10);
     user.password=hash;
})

module.exports = mongoose.model("User", userSchema);