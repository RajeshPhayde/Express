const { json } = require('express');
const { invitationMailOTP } = require('../helpers/emailOtpHelper');
const EmailOtp = require('../models/emailotp.model');
const otpGenerator = require('otp-generator');

let RegisterEmail = async (req, res, next)=>{
    let {email} = req.body;
    let isAvailable = await EmailOtp.findOne({email});
    if(!isAvailable){
        let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, specialChars:false })
        invitationMailOTP(email,otp);
        let newData = await EmailOtp.create({email, otp})
        return res.status(201).json({error:false, message:`Data added successfully with email ${email}`, data:newData})
    }
    return res.status(404).json({error:true, message:`Data already exist with email ${email}`})

}

let verifyEmail = async (req, res, next)=>{
    let {email, otp} = req.body;
    let isAvailable = await EmailOtp.findOne({email});
    if(!isAvailable){
        return res.status(404).json({error:true, message:`data not found with email ${email}`, data:isAvailable})
    }
    if(otp === isAvailable.otp){
        return res.status(200).json({error:false, message:`Hurrey login successful`})
    }
    return res.status(400).json({error:true, message:`Otp verification failed`})
}

let ResendOtp = async (req, res, next)=>{

    let {email} = req.body;
    let isAvailable = await EmailOtp.findOne({email});
    if(!isAvailable){
        return res.status(404).json({error:true, message:`data not found with email ${email}`, data:isAvailable})
    }
    let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, specialChars:false })
    invitationMailOTP(email,otp);

    let newOtpUpdate = await EmailOtp.findOneAndUpdate({email},{otp},{new:true})

    return res.status(200).json({error:false, message:`Otp Resent successfully to email ${email}`, data:newOtpUpdate})
}

module.exports = { RegisterEmail , verifyEmail, ResendOtp}