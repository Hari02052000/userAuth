const userModel = require('../models/user')
const jwt = require('jsonwebtoken')
const sendOtp = require('../helpers/otp') 

function isuser(req,res,next){
        
    const token=req.cookies.jwt
    if(token){
        jwt.verify(token,'key1',async(err,decoded)=>{
            if(err)return res.send(err);
            else{

               const user=await userModel.findOne({_id:decoded.id})
                let isVerified=user?.isEmailVerified
                 req.user = user
                if(!isVerified){
                    
                    sendOtp.sendOtp(user.email)
                    return res.render('user/verifyOTP',{user});
                }

                else {
                    return res.render('user/home',{user});

                }
                 
            }
        })
    }
    else {
      return  next()
    }
}




module.exports = {isuser}