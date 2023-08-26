const express = require('express');
const {addStudent, getAllStudent, getSingleStudent, editStudent, deleteStudent, editStudentAge, sortStudent} = require('../controllers/student.controller');
const { auth } = require('../services/authService');

let router = express.Router();

router.post("/addstudents", addStudent);
router.get("/getallstudent",  getAllStudent);
router.get("/getsinglestudent/:sid", auth, getSingleStudent);
router.put("/updatestudent/:sid", editStudent)
router.patch("/updatestudent/:sid", editStudentAge)
router.delete("/deletestudent/:sid", deleteStudent)
router.get("/sortstudent", sortStudent)

module.exports = router;