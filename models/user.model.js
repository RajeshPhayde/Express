const { Schema, model } = require('mongoose');

let UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is mandatory"],

    },
    age: {
        type: Number,
        required: true,
        min: [18, "Minimum age limit is 18, you entered {value}"],
        max: [60, "Maximum age limit is 60, you entered {value}"]
    },
    email: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        required: true
    }
},
    { timestamps: true })

    module.exports = new model("users", UserSchema)