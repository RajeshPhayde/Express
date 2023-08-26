const {Schema,model} = require('mongoose');

let studentSchema = new Schema(
    {
        name :
        {
            type: String,
            required : [true, "Name is mandatory"],
            // ! [val, message]
            minLength : [4, "Name should contain atleast 4 characters"],
            maxLength : [10, "Name can contain max 10 characters"]
        },
        age :
        {
            type: Number,
            required : true,
            min : [18, "Min age should be 18 and you entered {VALUE}"],
            max : [30, "Max age should be below 30 and you entered {VALUE}"]
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
    },{
        timestamps:true
    }
)

module.exports = new model("student", studentSchema)
//! collection name, schema

//? try crud operation for teachers data