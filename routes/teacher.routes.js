const express = require('express');
const { AddTeacher, GetAllTeachers, GetSingleTeacher, EditTeacher, DeleteTeacher, DeleteAll } = require('../controllers/teacher.controller');

let router = express.Router();

router.post("/addteacher", AddTeacher)
router.get("/getallteachers", GetAllTeachers)
router.get("/getsingleteacher/:tid", GetSingleTeacher)
router.patch("/updateteacher/:tid", EditTeacher)
router.delete("/deleteteacher/:tid", DeleteTeacher)
router.delete("/deleteallteacher", DeleteAll)

module.exports = router;