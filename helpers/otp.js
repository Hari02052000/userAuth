const nodemailer = require('nodemailer')


const key = process.env.MaileKey
const transporter = nodemailer.createTransport({

    host: "smtp.gmail.com",
    port: 465,
    auth: {
        user: 'eo.verify@gmail.com',
        pass: key
    }
  

});



let sendotp = undefined


    function sendOtp (email, appName="TestApp") {
    const otp = Math.floor(Math.random() * 10000);
    const mailOption = {
      from: `${appName} <autoSpace.verify@gmail.com>`,
      to: email,
      subject: "Otp verification",
      html: `<h2>Your verification code for ${appName} is : ${otp} </h2>`,
    };
    transporter.sendMail(mailOption, (err, info)=>{
      if(err) console.log(err)
    });
    
    sendotp = otp
    console.log(otp)
    return true 
  }

  function veryfyOtp(otp){
    
    if(sendotp == otp){
        return true
    }

    
    
  }

  module.exports = {sendOtp,veryfyOtp}
