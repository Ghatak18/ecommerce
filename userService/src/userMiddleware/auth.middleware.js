const jwt = require('jsonwebtoken')
const user = require('../userModels/user.model.js')


const verify = async(req,res,next) =>{
    try{
        const token = req.cookies.accesstoken
        if(!token) return res.status(401).json({msg:'Access denied'})
        const decodedUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user1 = await user.findById(decodedUser.id)
        if(!user1) return res.status(404).json({msg:'User not found'})
        req.user = user1
        next()

    }catch(error){
        res.status(500).json({message: 'Error verifying user', error: error.message})
    }
}

module.exports = verify;