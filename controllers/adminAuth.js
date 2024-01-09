const adminModel = require('../models/admin')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const maxage = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, 'key2', { expiresIn: maxage })
  }
  




async function showLogin(req,res){

    try{

       // await adminModel.create({email:'admin123@gmail.com',password:'123456'})

        res.render('admin/login')
    }

    catch(err){}
}

async function login(req,res){
    try{
      const{email,password} = req.body
      const admin = await adminModel.findOne({ email: email });
      console.log(admin)
  if (!admin) {
    res.json({ err: 'incorrect email or password' })
    return;
  }
  else {
    const match = await bcrypt.compare(password, admin.password)
    console.log(match)
    if (match) {
      const token = createToken(admin._id);

      res.cookie('Adminjwt', token, { httpOnly: true })
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
function logout(req,res){
    res.cookie('Adminjwt', '', { maxAge: 1 });
    res.redirect('/admin');

 }





module.exports = {showLogin,login,logout}