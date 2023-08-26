const { number } = require('joi');
const {Schema, model} = require('mongoose');

let Principal = new Schema({
    email : {
        type : String,
        required : [true, "email is mandatory"],
    },
    otp : {
        type: String,
        required : [true, "OTP is required"]
        // default:null
    }
},
{timestamps:true}
)

module.exports = new model ("emailotps", Principal)