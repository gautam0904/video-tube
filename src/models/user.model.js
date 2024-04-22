import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        index : true,
        unique : true,
        lowercase : true,
        trim : true
    },
    email  : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true
    },
    fullname  : {
        type : String,
        required : true,
        unique : true,
        index : true
    },
    avtar  : {
        type : String,
        required : true,
       
    },
    coverimage  : {
        type : String,
    },
    watchHistory : [
        {
            type : Schema.Types.ObjectId,
            ref : "Video"
        }
    ],
    password :{
        type : String,
        required : [true,"password is required"]
    },
    refreshTocken:{
        type : String
    }
}, {timestamps : true});

userSchema.pre("save" , async function (next){
    if (!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password ,10);
    next();
})

userSchema.methods.ispasswordcorrect = async function (password){
    return await bcrypt.compare(password , this.password);
}

userSchema.methods.genrateAccesToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            username : this.username,
            email : this.email,
            fullname : this.fullname
        },
        process.env.Access_Tocken_Secret,
        {
            expiresIn : process.env.Access_Tocken_expiery
        }

    )
}

userSchema.methods.genrateRfreshToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            username : this.username,
            email : this.email,
            fullname : this.fullname
        },
        process.env.Refresh_Token_Secret,
        {
            expiresIn : process.env.Refresh_Token_expiery
        }

    )
}

export const User = mongoose.Model("User" , userSchema); 