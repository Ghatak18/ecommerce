const user = require("../userModels/user.model.js");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const errorHandler = require("../userUtils/response.js");


const refreshToken = async(userId) =>{
    try{const user= user.findById(userId);
    if(!user){
        return null;
    }
    const token = user.generateRefreshToken();
    await user.save({
        validateBeforeSave: false
    });
    return token;
} catch(error){
    return null
}
}


const registerUser = async(req,res) =>{

    const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); // Send validation errors as response
        }

    try{    
    const {firstname, lastname, email, password} = req.body;
    const user1 = await user.findOne({email});
    if(user1) return errorHandler(res, {
        message: "Email already exists",
        statusCode: 400
    })

    const user2 = await user.create({
        first_name: firstname,
        last_name: lastname,
        email: email,
        password: password
    });
    console.log(user2._id)

    const createdUser = await user.findById(user2._id).select("-password")
    
    if(!createdUser){
        return errorHandler(res,{
            message: "User not created",
            statusCode: 400
        })
    }
    const accessToken = createdUser.generateAccessToken();
    const refreshToken1 = refreshToken(createdUser._id);

    console.log(accessToken);
    console.log(refreshToken1);

    const options = {
        httponly: true,
        secure: true
    }

    return res.status(201)
                .cookie("accesstoken",accessToken,options)
                .json({
                    "message": " user created successfully",
                    "user": createdUser,
                    "refreshToken" : refreshToken
})
    }catch(error){
        
        console.log(error)
        
    }
}

module.exports = {registerUser}
