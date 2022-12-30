const asyncHandler=require('express-async-handler')
const User=require('../models/userModel')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const crypto=require('crypto')
const Token=require('../models/tokenModel')
const sendEmail = require('../utils/sendemail')


const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"1d"})
};



// Register User
const registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password,phone,bio}=req.body;

    // validation for email,name,password

    if(!name || !email || !password)
    {
        res.status(400)
        throw new Error("Please fill in all required fields! ")
    }

    if(password.length<6)
    {
        res.status(400)
        throw new Error("Password must be upto 6 characters! ")
    }

    // check if user email already exists

    const userExists=await User.findOne({email})

    if(userExists)
    {
        res.status(400)
        throw new Error("Email has already been registered! ")
    }

    // create new user
    const user=await User.create({
        name,
        email,
        password,
        phone,
        bio
    })

    if(user)
    {

        // generate jwt token
        const token=generateToken(user._id);

        // send HTTP-only cookie to client
        res.cookie("token",token,{
            path:"/",
            httpOnly:true,
            expires:new Date(Date.now()+1000*86400), // 1 day
            sameSite:"none",
            secure:true

        });

        const {_id,name,email,photo,phone,bio}=user;

        res.status(201).json({
            _id,name,email,photo,phone,bio,token
        })
    }
    else
    {
        res.status(400)
        throw new Error("Invalid user data")
    }

});


// Login User
const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;

    // validate request 
    if(!email || !password)
    {
        res.status(400)
        throw new Error("Please add email and password! ")
    }
    
    //check if user exists
    const user=await User.findOne({email});

    if(!user)
    {
        res.status(400)
        throw new Error("User not found! Please Signup. ")   
    }

    // check if password is correct
    const passwordIsCorrect=await bcrypt.compare(password,user.password);

    if(user && passwordIsCorrect)
    {

        // generate jwt token
        const token=generateToken(user._id);

        // send HTTP-only cookie to client
        res.cookie("token",token,{
            path:"/",
            httpOnly:true,
            expires:new Date(Date.now()+1000*86400), // 1 day
            sameSite:"none",
            secure:true

        });

        const {_id,name,email,photo,phone,bio}=user;

        res.status(200).json({
            _id,name,email,photo,phone,bio,token
        });
    }
    else
    {
        res.status(400)
        throw new Error("Invalid email or password!")   
    }
});

// logout the user
const logout=asyncHandler(async(req,res)=>{
    // expire the cookie

    res.cookie("token","",{
        path:"/",
        httpOnly:true,
        expires:new Date(0), // expire the cookie
        sameSite:"none",
        secure:true
    });

    return res.status(200).json({"message":"Successfully Logged Out!"})

});

// get User Data
const getUser=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id);

    if(!user)
    {
        res.status(400)
        throw new Error("User not found!")
    }
    else
    {
        const {_id,name,email,photo,phone,bio}=user;

        res.status(200).json({
            _id,name,email,photo,phone,bio
        });
    }

});

// check if user is loggedin
const loginStatus=asyncHandler(async(req,res)=>{
    const token=req.cookies.token;

    // if user is logged-in status is true else false
    if(!token)
    {
        return res.json(false)
    }

    // verify token
    const verified=jwt.verify(token,process.env.JWT_SECRET);

    if(verified)
    {
        return res.json(true);
    }


    return res.json(false);
});

const updateUser=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id);

    if(user)
    {
        const {_id,name,email,photo,phone,bio}=user;

        user.email=email; // email cann't change 
        user.name=req.body.name || name;
        user.photo=req.body.photo || photo;
        user.phone=req.body.phone || phone;
        user.bio=req.body.bio || bio;

        const updatedUser=await user.save();

        res.status(200).json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            photo:updatedUser.photo,
            phone:updatedUser.phone,
            bio:updatedUser.bio
        })
    }
    else
    {
        res.status(404)
        throw new Error("User not Found!")
    }
});

const changePassword=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id);

    const {oldPassword,password}=req.body;

    if(!user)
    {
        res.status(404)
        throw new Error("User not found! Please SignUP");
    }

    //validate
    if(!oldPassword || !password)
    {
        res.status(400);
        throw new Error("Please add old and new Password!");
    }

    // check if old Password is Correct

    const passwordIsCorrect=await bcrypt.compare(oldPassword,user.password);

    if(passwordIsCorrect)
    {
        user.password=password;

        await user.save();

        res.status(200).send("Password changed Successfully!")
    }
    else
    {
        res.status(400)
        throw new Error("Please enter valid Password!")
    }

});

const forgotPassword=asyncHandler(async(req,res)=>{

    const {email}=req.body

    const user=await User.findOne({email})

    if(!user)
    {
        res.status(404)
        throw new Error("User not Found!")
    }

    // delete already existing token in database
    let token=await Token.findOne({userId:user._id})

    if(token)
    {
        await token.deleteOne();
    }

    // create reset Token
    let resetToken=crypto.randomBytes(32).toString("hex")+user._id;

    // hash Token before saving to DB
    const hashedToken=crypto.createHash("sha256").update(resetToken).digest("hex")
    
    // save token to DB
    await new Token({
        userId:user._id,
        token:hashedToken,
        createdAt:Date.now(),
        expiredAt:Date.now()+30*(60*1000) // 30 mintues, 1000 to convert to ms
    }).save();

    // construct reset URL
    const resetUrl=`${process.env.FRONTEND_URL}/resetpassword/${resetToken}`

    // reset email
    const message=`
        <h2>Hello ${user.name}</h2>
        <p>Please use the url below to reset your password</p>
        <p>This reset link is valid for only 30 minutes.</p>
        <a href=${resetUrl} clicktracing=off>${resetUrl}</a>
        <p>Regards...</p>
    `

    const subject="Password Reset Request"
    const send_to=user.email
    const send_from=process.env.EMAIL_USER

    try
    {
        await sendEmail(subject,message,send_to,send_from)
        res.status(200).json({success:true,message:"Reset Email Sent!"})
    }
    catch(err)
    {
        res.status(500)
        throw new Error("Email not sent, please try again!")
    }
    
});

const resetPassword=asyncHandler(async(req,res)=>{
    const {password}=req.body
    const {resetToken}=req.params

     // hash token and then compare to token in DB 
    const hashedToken=crypto.createHash("sha256").update(resetToken).digest("hex")

    // find token in DB
    const userToken=await Token.findOne({
        token:hashedToken,
        expiredAt:{$gt:Date.now()}
    })

    if(!userToken)
    {
        res.status(404)
        throw new Error("Invalid or Expired Token")
    }

    // Find User
    const user=await User.findOne({_id:userToken.userId})
    user.password=password
    await user.save()

    res.status(200).json({message:"Password reset successfully. Please Login!"})
});

module.exports={
    registerUser,loginUser,logout,getUser,loginStatus,updateUser,changePassword,forgotPassword,resetPassword
}