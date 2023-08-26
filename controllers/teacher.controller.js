const Teacher = require('../models/teacher.model');
const Joi = require('joi');

let TeacherSchema = Joi.object({
    name : Joi.string().min(4).required().messages({
        "string.base":"Name must be String",
        "string.min":"Name should contain minimum 4 character",
        "string.empty":"Name is Mandatory"
    }),
    subject: Joi.string().required().messages({
        "string.empty":"Subject is Mandatory"
    }),
    gender: Joi.string().required().messages({
        "string.empty":"Gender is Mandatory"
    }) ,
    email : Joi.string().required().email().messages({
        "string.email":"email format should be perfect"
    })
})

let AddTeacher = async(req, res, next)=>{
    try
    {
        let {name, subject, gender, email} = req.body;
        let {value, error} = TeacherSchema.validate({name, subject, gender, email})
        if(error){
            return res.status(400),json({error:true, message:"Validation failed", err:error})
        }
        else{
            let NewTeacher = await Teacher.create(value,{runValidator:true});
            res.status(201).json({error:false, message:"Teacher added successfully", data:NewTeacher})
        }
    }
    catch(err){
        next(err)
    }
}

let GetAllTeachers =async (req, res, next)=>{
    let AllTeachers = await Teacher.find();
    if(AllTeachers.length == 0){
        return res.status(404).json({error:true,message:`Data not available`, data:AllTeachers})
    }
    return res.status(302).json({error:false, message:"Teachers data fetched successfully", data:AllTeachers })
}

let GetSingleTeacher = async (req, res, next)=>{
    let {tid} = req.params
    let singleTeacher = await Teacher.findById(tid);
    if(!singleTeacher){
        return res.status(404).json({error:true,message:`Data not available with id : ${tid}`, data:singleTeacher})
    }
    return res.status(302).json({error:false, message:`Data found with id ${tid}`, data:singleTeacher})
}

let EditTeacher = async (req, res, next)=>{
    let {subject} = req.body;
    let {tid} = req.params;
    // let singleTeacher = await Teacher.findById(tid);
    // if(!singleTeacher){
    //     return res.status(404).json({error:true,message:`Data not available with id : ${tid}`, data:singleTeacher})
    // }
    try
    {
        let {value, error} = TeacherSchema.validate({subject});
        if(error){
            return res.status(400),json({error:true, message:"Validation failed", err:error})
        }
        else{
            let UpdateTeacher = await Teacher.findOneAndUpdate({_id:tid}, value,{new:true, runValidator:true})
            return res.status(200).json({error:false, message: `${UpdateTeacher.name} updated to ${subject} subject`, data:UpdateTeacher})
        }
    }
    catch(err){
        next(err)
    }
}

let DeleteTeacher = async (req, res, next)=>{
    let {tid}= req.params;
    try{
        let DeleteTech = await Teacher.findOneAndDelete({_id:tid})
        return res.status(200).json({error:false,message:`${DeleteTech.name} got deleted`, data:DeleteTech})
    }
    catch(err){
        next(err)
    }
}

let DeleteAll = async (req, res, next)=>{
    let DeleteTeachers = await Teacher.deleteMany()
    if(!DeleteTeachers.deletedCount){
        return res.status(404).json({error:true, message:"No data available to delete", data:DeleteTeachers})
    }
    return res.status(200).json({error:false,message:"Oops all Teachers data got deleted",data:DeleteTeachers})
}

module.exports = {AddTeacher, GetAllTeachers, GetSingleTeacher, EditTeacher, DeleteTeacher, DeleteAll}