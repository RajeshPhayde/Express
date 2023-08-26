const express = require('express');
const { RegisterTeacher, TeacherLogin ,getAllTeacher, ResetPassword} = require('../controllers/teacher.controller.login');
const { auth } = require('../services/authService');

let router = express.Router();

router.post("/addteacher", RegisterTeacher )
router.post("/loginteacher", TeacherLogin )
router.get("/getalleacher", auth, getAllTeacher )
router.post("/resetpassword", ResetPassword )

module.exports = router;