const mongoose = require('mongoose')
const {Schema} = require('mongoose');
const bcrypt = require("bcrypt")

const adminSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true
        }

    }
    
)

adminSchema.pre("save", async function (next) {

    this.password = await bcrypt.hash(this.password, 10)
    next()
})




 const Admin = mongoose.model("Admin", adminSchema)

 module.exports = Admin