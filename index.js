const express = require('express');

const dotenv = require('dotenv');

const path = require('path')
const cookieParser=require('cookie-parser')

require('ejs');

dotenv.config({path:'./.env'})



const userRoute = require('./routes/userRoutes')
const adminRoute = require('./routes/adminRoutes')

const connectDB = require("./db/connection");




const app = express()

app.set('views', path.join(__dirname, '/client'))  

 
app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(cookieParser())

app.use('/',userRoute);
app.use('/admin/',adminRoute)

connectDB().then(()=>{

    app.listen(process.env.PORT,()=>console.log(`app runing at ${process.env.PORT}`))

}).catch((err)=>console.log('database connection failed',err))

