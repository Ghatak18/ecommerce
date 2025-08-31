const user = require("../userModels/user.model.js");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const errorHandler = require("../userUtils/response.js");


const refreshToken = async(userId) =>{
    try{const user1=await user.findById(userId);
    if(!user1){
        return null;
    }
    const token = await user1.generateRefreshToken();
    user1.refreshToken = token;
    await user1.save({
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
    const refreshToken1 =await refreshToken(createdUser._id);

    createdUser.password = undefined;
    const options = {
        httponly: true,
        secure: true
    }

    return res.status(201)
                .cookie("accessToken",accessToken,options)
                .json({
                    "message": " user created successfully",
                    "user": createdUser,
                    "refreshToken" : refreshToken
})
    }catch(error){
        
        console.log(error)
        
    }
}

const loginUser = async (req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return errorHandler(res, {
                message: "Invalid input",
                statusCode: 400,
            })
        }
        const { email, password } = req.body;
        const user1 = await user.findOne({ email: email });
        console.log(user1);
        if (!user1) {
            return errorHandler(res, {
                message: "User not found",
                statusCode: 404
            })
        }
        const isMatch = await user1.comparePassword(password);
        if (!isMatch) {
            return errorHandler(res, {
                message: "Invalid password",
                statusCode: 400
            })
        }
        console.log(isMatch)
        const accessToken = user1.generateAccessToken();
        const refreshToken1 = await refreshToken(user1._id);
        console.log(refreshToken)
        console.log(accessToken)
        const options = {
            httponly: true,
            secure: true
        }
        res.status(200)
            .cookie("accessToken", accessToken , options)
            .json({
                "message": "User logged in successfully",
                "user": user1,
            })

    }catch(error){
        return errorHandler(res, {
            message: "Invalid email or password",
            statusCode: 400
        })
    }
}

const logoutUser = async(req, res) =>{
    await user.updateOne({ _id: req.user._id }, {
        $unset:{
            "refreshToken": 1,
        }},{
            new: true
        })
        const options = {
            httpOnly: true,
            secure: true, // Only if you're using HTTPS
            sameSite: "strict"
        };
        
    return res.clearCookie("accessToken", options).send({
        message: "User logged out successfully",
    })
}



const verifyUser = async(req,res)=>{
    try {
        const { token } = req.body;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Correct: Use 'id' (matches JWT payload)
        const foundUser = await user.findById(decoded.id); // lowercase 'user'
        
        if(!foundUser){
            return errorHandler(res, {
                message: "User not found",
                statusCode: 404
            });
        }
        return res.json(foundUser);
    } catch(error){
        console.log(error)
        return errorHandler(res, {
            message: "Invalid token",
            statusCode: 401
        });
    }
}
// Auth Service

module.exports = {registerUser,loginUser, logoutUser,verifyUser}
