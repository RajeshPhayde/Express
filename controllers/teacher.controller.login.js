const Teacher = require('../models/teacher.model.login');
const Joi = require('joi');
const bcryptjs = require('bcryptjs');
const { invitationMail } = require('../helpers/mailHelper');
const jwt = require('jsonwebtoken');
require('dotenv').config();

let teacherLogin = Joi.object({
    name: Joi.string().required().min(4).messages({
        "string.base" : "Name must be string",
        "string.min" : "Name should contain minimum 4 character",
        "string.empty" : "Name is mandatory"
    }),
    email: Joi.string().required().email().messages({
        "string.base" : "email must be a string",
        "string.empty" : "email is mandatory"
    }),
    password : Joi.string().required().messages({
        "string.base" : "password must be a string",
        "string.empty" : "password is mandatory"
    })
})

let RegisterTeacher = async (req, res, next)=>{
    try{
        let {name, email, password} = req.body
        let {value, error} = teacherLogin.validate({name, email, password})

        // let salt = await bcryptjs.genSalt(10); //length of encrypted password
        // let hashedPassword = await bcryptjs.hash(password, salt);

        if(error){
            return res.status(400),json({error:true, message:"Validation failed", err:error})
        }
        else{
            let isTeacherAvailable = await Teacher.findOne({email})

            if(!isTeacherAvailable){
                invitationMail(email,name);
                let newTeacher = await Teacher.create({name, email, password})
                return res.status(201).json({error:false, message:"Teacher added successfully",data:{name:newTeacher.name, email:newTeacher.email}})
            }
            res.status(409).json({error:true, message:`Teacher already exist with email id : ${email}`})
        }
    }
    catch(err){
        next(err)
    }
}

let getAllTeacher = async (req, res, next)=>{
    try{

        let teachers = await Teacher.find({},{_id:0, password:0})
        return res.status(200).json({error:false, message:`Data fetched successfully`, data:teachers, user:{email:req.user.email, name: req.user.name}})
    }
    catch(err){
        next(err);
    }
}

let ResetPassword = async (req, res, next)=>{
    try{
        let {email, password} = req.body;

        let isTeacherAvailable = await Teacher.findOne({email});

        if(!isTeacherAvailable){
            return res.status(404).json({error:true, message:`Teacher detail not found with email id ${email}`})
        }
        let salt = await bcryptjs.genSalt(10); //length of encrypted password
        let hashedPassword = await bcryptjs.hash(password, salt);
        let updatedTeacher = await Teacher.findOneAndUpdate({email}, {password:hashedPassword}, {new:true})
        console.log()
        return res.status(200).json({error:false, message:`Password updated successfully`, data:{email,name:updatedTeacher.name}})

    }
    catch(err){
        next(err);
    }
}

let TeacherLogin = async (req, res, next)=>{
    try{
        let {email, password} = req.body;

        let isAvailable = await Teacher.findOne({email});

        if(!isAvailable){
            return res.status(404).json({error:true, message:`Teacher not found with given email ${email}`})
        }

        let hashedPassword = await isAvailable.compareMyPassword(password)
        if(hashedPassword){

            let token = jwt.sign({email:isAvailable.email, name:isAvailable.name}, process.env.JWT_KEY, {expiresIn:"3m"})
            return res.status(200).json({error:false, message:`Login successfull, welcome ${isAvailable.name}`,token})
        }
        else{
            return res.status(401).json({error:true, message:`Invalid Password`})
        }
    }
    catch(err){
        next(err)
    }
}

module.exports = { RegisterTeacher, TeacherLogin, getAllTeacher, ResetPassword}