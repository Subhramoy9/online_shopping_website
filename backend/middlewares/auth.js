var jwt = require('jsonwebtoken');
const secret='mynameissubhramoybiswasandimaboy';
const User=require('../models/userModels');




exports.authenticatedUser=(req,res,next)=>{
    const {token}=req.cookies;

    if(!token){
        res.status(400).send('TOken not found');
    }
    const verified=jwt.verify(token,secret);

    if(verified){
        next();
    }

}

exports.role=async(req,res,next)=>{

    const {token}=req.cookies;
    const verification=jwt.verify(token,secret);
    const user=await User.findById({_id:verification._id});
    
    
    // console.log(user);
    if((user.role)==='admin'){
        next();
    }
    else{
            console.log(user.role);
            res.status(404).send('U are not authorized to do this activity');
         }

}