const express = require('express');
const { createUser, getUsers } = require('../controllers/user.controller');
const multer = require('multer');

let router = express.Router()

//! image upload code starts
const myStorage = multer.diskStorage({
    
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
      },
      filename: function (req, file, cb) {
        
        cb(null, file.originalname)
      }
})

const upload = multer({ storage: myStorage })

  //! image upload code ends

router.post("/adduser",upload.single("profile"), createUser)
router.get("/getusers", getUsers)

module.exports = router