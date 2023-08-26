const {Schema, model} = require('mongoose');

let internSchema = new Schema({
    name:{
        type: String,
        required:[true, "Name is mandatory"],

    },
    age:{
        type:Number,
        required:true,
        min : [18, "Minimum age limit is 18, you entered {value}"],
        max : [60, "Maximum age limit is 60, you entered {value}"]
    },
    email:{
        type:String,
        required:true,
        unique :true
    },
    password:{
        type:String,
        required:true,
        minLength:[6, "Password should contain minimum 6 characters"],
        maxLength:[10, "Password should contain maximum 10 characters"]
    }
},
{timestamps:true})
