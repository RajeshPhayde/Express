const {Schema, model} = require('mongoose');
const bcryptjs = require('bcryptjs');

let TeacherSchema = new Schema({
    name : {
        type : String,
        required : [true, "Name is mandatory"],
    },
    email : {
        type : String,
        required : [true, "Email is required"]
    },
    password : {
        type : String,
        required : [true, "Password is required"]
    }
},
{timestamps:true}
)

//! Don't use arror function for pre method
TeacherSchema.pre("save", async function(next){
    let salt = await bcryptjs.genSalt(10); //length of encrypted password
    this.password = await bcryptjs.hash(this.password, salt); //this refers to current schema

    //! from 5 and above version of mongoose next() is not required here.
})

TeacherSchema.methods.compareMyPassword = async function(password){
    let hashedPassword = await bcryptjs.compare(password, this.password)
    return hashedPassword
}


module.exports = new model("teacherslogin", TeacherSchema)