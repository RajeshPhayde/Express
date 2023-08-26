const {connect} = require('mongoose');
require('dotenv').config();

connect(process.env.DEV_MONGOURL)
// connect(process.env.PROD_MONGOURL)
.then(()=>{
    console.log("mongodb Connected Successfully");
})
.catch((err)=>{
    console.log(err)
})