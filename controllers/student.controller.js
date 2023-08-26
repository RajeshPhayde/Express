const Student = require('../models/student.model');
const Joi = require('joi');

let studentSchema = Joi.object({
    name: Joi.string().min(4).required().messages({
        "string.base":"Name must be String",
        "string.min":"Name should contain minimum 4 character",
        "string.empty":"Name is Mandatory"
    }),
    age: Joi.number().required().messages({
        "string.empty":"Age is mandatory"
    }),
    gender:Joi.string().required().messages({
        "string.empty":"gender is mandatory"
    }),
    email:Joi.string().required().email().messages({
        "string.email":"email format should be perfect",
        "string.empty":"email is mandatory"
    })
})

let addStudent = async(req, res, next)=>{

    try{
        let {name, age, gender, email} = req.body;

        let {value, error} = studentSchema.validate({name, age, gender, email})
        if(error){
            return res.status(400).json({error:false,message:"Validation failed",err:error})
        }
        let newStudent = await Student.create(value)
        res.status(201).json({error:false, message: "Data Added Successfully", data:newStudent})
    }
    catch(err){
        next(err);
    }
}
let getAllStudent = async(req, res, next)=>{

    let allStudents = await Student.find();
    // if(allStudents == []){
    //     return res.status(404).json({error:true, message: "No students available", data: allStudents})
    // }    
    return res.status(200).json({count:allStudents.length, error:false, message: "Data fetched Successfully", data: allStudents})
}

let getSingleStudent = async(req , res, next)=>{

    let {sid} = req.params
    let SingleStudent = await Student.findOne({name:sid});

    if(!SingleStudent){
        return res.status(404).json({error:true, message:`Student not found with id ${sid}`, data:null})
    }
    return res.status(201).json({error:false,message:"Student found successfully", data:SingleStudent})
}

//! Update student

let editStudent = async (req, res, next)=>{
   try
   {
    let {name, age, gender} = req.body;
    let {sid} = req.params;

    let {value, error} = studentSchema.validate({name, age, gender})
    if(error){
        res.status(400).json({error:false, message:"Validation failed", err:error})
    }
    else{

        // let SingleStudent = await Student.findOne({name:sid});
        let SingleStudent = await Student.findById(sid);
        
        if(!SingleStudent){
            return res.status(404).json({error:true, message:`Student not found with id ${sid}`, data:null})
        }
        // ? runValidators -> Used to validate schema while updating...
        let updatedStudent = await Student.findOneAndUpdate({_id:sid},value,{new:true, runValidators:true})
        
        return res.status(200).json({error:false,message:`${updatedStudent.name} is updated with age from ${SingleStudent.age} to ${updatedStudent.age} successfully`, data:updatedStudent})
    }
}
catch(err){
    next(err)
}
}

//! update student by age

let editStudentAge = async (req, res, next)=>{
    let {age} = req.body;
    let {sid} = req.params;

    // let SingleStudent = await Student.findOne({name:sid});
    let SingleStudent = await Student.findById(sid);

    if(!SingleStudent){
        return res.status(404).json({error:true, message:`Student not found with id ${sid}`, data:SingleStudent})
    }
// ? runValidators -> Used to validate schema while updating...
    let updatedStudent = await Student.findOneAndUpdate({_id:sid},{age},{new:true, runValidators:true})

    return res.status(200).json({error:false,message:`${updatedStudent.name} is updated with age from ${SingleStudent.age} to ${updatedStudent.age} successfully`, data:updatedStudent})
}

//! Delete single Student

let deleteStudent = async (req, res, next)=>{
    let {sid} = req.params;

    let AvailableStudent = await Student.findById(sid)

    // if(!AvailableStudent){
    //     return res.status(404).json({error:true, message:`Student not found with id ${sid}`})
    // }

    let removeStudent = await Student.findOneAndDelete({_id:sid})

    return res.status(200).json({error:false, message:`${AvailableStudent.name} deleted successfully`})
}

let sortStudent = async (req, res, next)=>{
   let { name, age, gender, email, sort, select}= req.query

   let query = {}
   if(name){

    //! getting all student name same as given name
    // query.name = name;
    //! getting all student whose name includes given name
    query.name = {$regex:name,$options:"i"}
   }
   if(age){
    query.age= Number(age);
   }
   if(gender){
    query.gender = gender;
   }
   if(email){
    query.email = email;
   }

   let students =  Student.find(query);
//    let students = await Student.find({name : /raj/i});

   if(sort){
        students = students.sort(sort);
   }
   else{
    //! if sort is not given sort based on name 
    //? "name" -> ascending |||| "-name" -> Descending
        students = students.sort("createdAt")
        //? can also sort based on any key, by just giving key name.
   }
   if(select){
        let splittedFields = students.split(",").join(" ")
        students = students.select(select+" _id")
   }
   students = await students;
   return res.status(200).json({count:students.length, error:false,
                                message:`Data fetched successfully`, data:students})
}

module.exports = {addStudent, getAllStudent,
    getSingleStudent, editStudent, deleteStudent,
    editStudentAge, sortStudent }
