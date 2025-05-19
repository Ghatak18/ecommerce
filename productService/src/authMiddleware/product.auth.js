const jwt = require('jsonwebtoken')
const axios = require('axios')


const verify = async(req, res, next) => {
    try {
        const token = req.cookies.accessToken;
        if(!token) return res.status(401).json({msg: 'Access denied'});

        // Call User Service's /verify endpoint
        const { data } = await axios.post(
            'http://localhost:3000/api/user/verify', 
            { token },
            { headers: { 'Content-Type': 'application/json' } }
        );

        if(!data) return res.status(401).json({msg: 'Invalid token'});
        
        req.user = data; // Attach the full user object
        next();
    } catch(error) {
        console.error('Verification error:', error.message);
        res.status(500).json({message: 'Error verifying user'});
    }
};

module.exports = verify;