const mongoose=require('mongoose');
const {Schema}=mongoose;

const UserSchema=new Schema({
    name:{
        type:String,
        required:[true,"Please enter user name"],
    },
    email:{
        type:String,
        required:[true,"please enter ur email"],
        unique:true

    },
    password:{
        type:String,
        minLength:[8,"password must be of atleast 8 characters"]
    },
    role:{
        type:String,
        default:'user'
    },
    resetPasswordToken: {
        type:String
    }
})
const User=mongoose.model("User",UserSchema);
module.exports=User;