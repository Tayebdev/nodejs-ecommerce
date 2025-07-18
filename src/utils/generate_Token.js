const jwt=require('jsonwebtoken');

const generateAccessToken = (payload)=>{
    return jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.JWT_EXPIRES_TIME})
}

module.exports={
    generateAccessToken
}