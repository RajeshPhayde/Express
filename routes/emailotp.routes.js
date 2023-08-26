const express = require('express');
const {RegisterEmail, verifyEmail, ResendOtp} = require('../controllers/emailotp.controller');

let router = express.Router();

router.post("/registeremail", RegisterEmail)
router.post("/verifyemail", verifyEmail)
router.post("/resendotp", ResendOtp)


module.exports = router;