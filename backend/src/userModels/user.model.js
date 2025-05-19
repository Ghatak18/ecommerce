const mongoose = require('mongoose');
const  Schema  = mongoose;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:true,
        index:true,
        trim:true
    },
    last_name:{
        type:String,
        required:true,
        index:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        index:true,
        trim:true,
        lowercase:true    
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer'
    },

    avaatar:{
        type:String,
        default:""
    },
    refreshToken:{
        type:String,
    }
},{
    timestamps: true
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
}
try{
    this.password = await bcrypt.hash(this.password,10);
    next();
}catch(error){
    next(error);
}
});


userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword,this.password);
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {id:this._id},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: process.env.ACCESS_TOKEN_EXPIRY});
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {id: this._id},
        process.env.REFRESH_TOKEN_SECRET,
         {expiresIn: process.env.REFRESH_TOKEN_EXPIRY});
    
}

const user = mongoose.model('user',userSchema);
module.exports = user;