const express = require('express');
require('dotenv').config();
require('./adapters/connectionDb');
const studentRoutes = require('.//routes/student.routes');
const TeacherRoutes = require('.//routes/teacher.routes');
const TeacherLoginRoutes = require('.//routes/teacherLogin.routes');
const EmailOtpRoutes = require('.//routes/emailotp.routes');
const UserRoutes = require('.//routes/user.routes');

let app = express();

app.use(express.json()) //? if not used data will be undefined when we get data from front end

app.use(express.static("./public/"))

//? use method call middleware
//! Why it is called => TO CALL THE MIDDLEWARE

app.use("/api/student", studentRoutes)
app.use("/api/teacher", TeacherRoutes)
app.use("/api/teacherlogin", TeacherLoginRoutes)
app.use("/api/emailotp", EmailOtpRoutes)
app.use("/api/user", UserRoutes)

//! PAGE NOT FOUND MIDDLEWARE
app.use("*",(req, res, next)=>{
    res.status(404).json({error:true, message: "Page Not Found"})
})

//! error handling Middleware
app.use((err, req, res, next)=>{
    res.status(400).json({error:true, message:err.message, data:"Oops error buddy"})
})

app.listen(process.env.PORT, (err)=>{
    if(err) throw err
    console.log(`Server is running on PORT : ${process.env.PORT}`)
})