const {Schema, model} = require('mongoose');

let TeacherSchema = new Schema(
    {
        name : {
            type : String,
            requires : [true, "Name is Mandatory"],
            minLength : [4, "Name should contain min 4 characters"],
            maxLength : [10, "Name can contain max 10 characters"]
        },
        subject : {
            type : String,
            requires : [true, "Subject is Mandatory"],
            minLength : [4, "Name should contain min 4 characters"],
            maxLength : [15, "Name can contain max 10 characters"]
        },
        gender :
        {
            type: String,
            required : true,
            enum : {
                values : ["male", "female", "other"],
                message : "Gender can be male, female, other allowed and you entered {VALUE}"
            }
        },
        email : {
            type : String,
            required : true,
            unique : true
        }
    },
    {
        timestamps : true
    }
)

module.exports = new model("teachers", TeacherSchema)