const validaters = require('../helpers/validaters')
const userModel = require('../models/user')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const otpController = require('../helpers/otp')
const bcrypt = require('bcrypt')



const maxage = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, 'key1', { expiresIn: maxage })
  }
  

 function showHome(req,res){

    try{

        res.render('user/home')
    }

    catch(err){}
}


 function showRegister(req,res){

    try{

        res.render('user/register')
    }

    catch(err){}
}

function showLogin(req,res){

    try{

        res.render('user/login')
    }

    catch(err){}
}

async function register (req,res){
    try{
        console.log('register')
       const{username,password,phone,email} = req.body
      const result = await validaters.validateUser(username,password,email,phone)
       console.log(result)
     if(!result.isValidEmail) return res.status(400).json({err:'enter a valid email'})
      if(!result.isValidPhone) return res.status(400).json({err:'enter a valid phone number'})
      if(!result.isValidPassword) return res.status(400).json({err:'password contain atleast 8 char includes uppercase,lowercase and special chara'})
    const isOldUser = await userModel.findOne({username:username})
    if(isOldUser) return res.status(409).json({err:'username allready exist'})
   const isOldPhone = await userModel.findOne({phone:phone})
   if(isOldPhone) return res.status(409).json({err:'mobile number allready exist'})
   const isOldemail = await userModel.findOne({email:email})
   if(isOldemail) return res.status(409).json({err:'email allready exist'})
   if(!req.file) return res.status(401).json({err:'profile is required'})
   const fileData =  fs.readFileSync(req.file.path);


   const newUser = await userModel.create({username,email,phone,profile:fileData,password})

   fs.unlinkSync(req.file.path);

      const token = createToken(newUser._id)

      res.cookie('jwt', token, { maxage: maxage, httpOnly: true })

       otpController.sendOtp(newUser.email)
      res.json({ userCreated: true })



    }
    catch(err){

    }
}
function showOTP(req,res){

    try{

        res.render('user/verifyOtp')
    }

    catch(err){}
}

async function verifyOTP(req,res){

    try{
        const otp = parseInt(req.body.otp)
      const isVerified =  otpController.veryfyOtp(otp)
      if(isVerified){
        await userModel.findOneAndUpdate({_id:req.body.userid},{isEmailVerified:true})
      }
      else{
        return res.json({err:"enter valid otp"})
      }

      res.json({verified:true})

    }

    catch(err){}
}

function resendOTP(req,res){
    try{

        console.log(req.body)
        res.json({send:true})
    }
    catch{}
}

   async function login(req,res){
        try{
          const{email,password} = req.body
          const user = await userModel.findOne({ email: email });
      if (!user) {
        res.json({ err: 'incorrect email or password' })
        return;
      }
      else {
        const match = await bcrypt.compare(password, user.password)
        if (match) {
          const token = createToken(user._id);
          res.cookie('jwt', token, { httpOnly: true })
          
          res.json({ logedin: true })
        }
        else {
          res.json({ err: 'incorrect email or password' })
          return;
        };
    }
}
        
        catch(err){
            console.log(err)
        }
    }

    function download(req,res){
        
        const token=req.cookies.jwt
        if(token){
            jwt.verify(token,'key1',async(err,decoded)=>{
                if(err)return res.send(err);
                else{
    
                   const user=await userModel.findOne({_id:decoded.id})
                     req.user = user
                    
                     const imageData = user.profile;
  
        res.setHeader('Content-Type', 'image/png');
      res.setHeader('Content-Disposition', 'attachment; filename=User_Profile.png');

  const imageBuffer = Buffer.from(imageData, 'base64');
  res.send(imageBuffer);
  
                }
            })
        }
        else{
            res.json({err:'failed'})
        }
    

    }
 function logout(req,res){
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');

 }




module.exports = {
    showHome,showRegister,showLogin,register,showOTP,verifyOTP,resendOTP,login,logout,download
}