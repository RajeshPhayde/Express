const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service : "Gmail",
    auth :{
        user : "ajnathahere@gmail.com",
        pass : "ulsvzbsvojtcifnt"
    }
})

let invitationMail = async (email, name)=>{

    transporter.sendMail({
        from : "ajnathahere@gmail.com",
        to : email,
        subject : "Invitation mail",
        html : `<div><h1 style="color : red;">Welcome</h1><p style="color : blue;">Thanks for Registering ${name}...</p></div>`
    }, ()=>{console.log("Mail sent successfully")})

}

let sendOtp=async (email,otp,name)=>
{
    let mailOptions={
        from:"ramugunaga25@gmail.com",
        to:email,
        subject:"OTP Mail",
        html:`<h1>Hi ${name}, Your OTP for XYZ Application is ${otp}</h1>`
    }
    transporter.sendMail(mailOptions, ()=>{console.log("OTP Sent Successfully")})
}

module.exports = { invitationMail, sendOtp }