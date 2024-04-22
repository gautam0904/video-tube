import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        index : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
    },
    fullName :{
        type : String,
        required : true,
        trim : true,
        index : true
    },
    avtar :{
        type : String, // clounary link
        required : true,
    },
    coverImage : {
        type : String, // clounary link
    },
    wachHistory : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref :  'video',
        }
    ],
    password :{
        type : String,
        required : true,
    },
    refreshToken : {
        type : String
    }
},{timestamps : true});

userSchema.pre("save" , async function(next){
    if(!this.isModified("password")) return next()
this.password =  bcrypt.hash(this.password ,12);
    
});

userSchema.methods.isPassworCorrect = async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.genrateAccessToken = function(){
    jwt.sign({_id : this._id ,userName : this.userName ,email :  this.email,fullName : this.fullName},process.env.ACCESS_TOKEN_SECERET ,{expiresIn : process.env.ACCESS_TOKEN_EXPIRY} )
}

userSchema.methods.genrateRefreshToken = function(){
    jwt.sign({_id : this._id },process.env.REFERESH_TOKEN_SECERET ,{expiresIn : process.env.REFERESH_TOKEN_EXPIRY} )
}



export const User = mongoose.model('User',userSchema)