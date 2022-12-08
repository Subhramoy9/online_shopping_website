// const express=require('express');
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs');
const User=require('../models/userModels');
const { response } = require('express');
const jsonWebToken=require('../utils/jwtToken');
const crypto=require("crypto");
const nodemailer = require("nodemailer");

//Creating a user
exports.registerUser=async (req,res)=>{
    const {name,email,password,role}=req.body;
    try{
    if(!name || !email || !password ){
        res.status(400).send('Enter all the credentials');
    }
    const oldUser=await User.findOne({email});
    if(oldUser){
        res.status(400).send('User already exists');
    }
    const salt=await bcrypt.genSalt(10);
    const encryptedPass=await bcrypt.hash(password,salt);
    
    let user=User.create({
        name:req.body.name,
        email:req.body.email,
        password:encryptedPass,
        role:req.body.role

      }).then(user => res.json(user));
    //   jsonWebToken(user);
    }catch{
        (err)=>{
            res.status(400).send(err);
        }
    }
}

//login user

exports.loginUser=async(req,res)=>{
    
    const {email,password}=req.body;
    try{

    if(!email || !password ){
        res.status(400).send('Enter all the credentials');
    }
    const oldUser=await User.findOne({email});
    if(!oldUser){
        res.status(400).send('User not found');
    }
    const verification=await bcrypt.compare(password,oldUser.password);
    if(verification===true){
        jsonWebToken(oldUser,res);
        res.json(oldUser);
        console.log('hi')
        
        // res.send('successfully logged in');
      
        

    }
    else{
        res.status(400).send('wrong credentials');
    }
    
    }catch{
        (e)=>{
            res.status(400).send(e);
        }
    }
}

//forgot password

exports.forgotPassword=async(req,res)=>{
    const user=User.findOne({email:req.body.email});
    if(!user){
        res.status(404).send('user not found');
    }
    try{
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken=crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
    
    const verificationUrl=`${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "biswassubhramoy0987@gmail.com", // generated ethereal user
          pass: "eyelovedj", // generated ethereal password
        },
      });

      await transporter.sendMail({
        from: 'biswassubhramoy0987@gmail.com', // sender address
        to: "anamikabiswas2176@gmail.com", // list of receivers
        subject: "vrification", // Subject line
        text: `Click on this ${verificationUrl} for authentication `// plain text body
        
      });
    }catch(err){
        res.json({err});
    }
}

//reset password

exports.resetPassword=(req,res)=>{
const resetPasswordToken=crypto
.createHash("sha256")
.update(req.params.token)
.digest("hex");

const user=User.findOne({resetPasswordToken});

if(!user){
    res.status(400).send('User not found');
}

if(req.body.password!==req.body.confirmPassword){
    res.status(400).send('Re-enter the password correctly');
}
    user.password=req.body.password;

}

//Search single user

exports.findSingleUser=async(req,res)=>{
   
    const user=await User.findById(req.params.id);

    if(!user){
        res.send('Not found user');
    }
    res.send(user);

}

// updating user roles

exports.updateUserRole=async(req,res)=>{
    const {role}=req.body.role;
    
    await User.findByIdAndUpdate(req.params.id,{role:req.body.role}).then((result)=>{
         res.send(result);
     }).catch((err)=>{res.send(err)});
}

// getting all the users

exports.findUsers=async(req,res)=>{
    const user=await User.find();
    if (user){
        res.json({user});
    }
    else{
        res.send('no users found');
    }
}

// changing user details

exports.updateUser=async(req,res)=>{
    const newUser={
        name:req.body.name,
        email:req.body.email
    };
    await User.findByIdAndUpdate(req.params.id,newUser).then((result)=>{
        res.send(result);
    }).catch((err)=>{res.send(err)});
}

//logout

exports.logout=(req,res)=>{
    try{
    res.cookie('token',null,{expires:new Date(Date.now())})
    .status(200).json({
        success:true
    }).send('Successfully logged out');
    }catch(err){
        res.status(400).send(err);
    }
}

//remove user

exports.removeUser=async(req,res)=>{
    const user=await User.findById(req.params.id);

    if(!user){
        res.status(404).send('User does not exist');
    }
    await user.remove();
}