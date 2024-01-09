const mongoose = require('mongoose')
const {Schema} = require('mongoose');
const bcrypt = require("bcrypt")

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone:{
            type:Number,
            required:true
        },
        isEmailVerified:{
          type:Boolean,
          default:false
        },
        isMobileVerified:{
          type:Boolean,
          default:false
        },
        profile: {
            type: Buffer, 
            required: true,
        },
        password: {
            type: String,
            required: true
        }

    }
    
)

userSchema.pre("save", async function (next) {

    this.password = await bcrypt.hash(this.password, 10)
    next()
})




 const User = mongoose.model("User", userSchema)

 module.exports = User