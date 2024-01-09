const userModel = require('../models/user')
const adminModel = require('../models/admin')

const jwt = require('jsonwebtoken')

function isAdmin(req,res,next){

        
    const token=req.cookies.Adminjwt
    if(token){
        jwt.verify(token,'key2',async(err,decoded)=>{
            if(err)return res.send(err);
            else{

               const admin=await adminModel.findOne({_id:decoded.id})
                 req.admin = admin
                
                if(admin){
                  let users = await userModel.find()
                    return res.render('admin/home',{users})

                }
                 
                 
            }
        })
    }
    else {
      return  next()
    }
}

module.exports = {isAdmin}