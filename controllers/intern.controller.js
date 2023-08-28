const Intern = require('../models/intern.model');
const { StatusCodes } = require('http-status-codes');

let addIntern = async (req, res, next) => {
    try {
        let { name, age, email, password } = req.body

        let availableIntern = await Intern.findOne({ email })
        if (!availableIntern) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: true, message: `Intern data not found with email ${email}` })
        }

        let insertIntern = await Intern.create({name, age, email, password});
        return res.status(StatusCodes.ACCEPTED).json({error:false, message:`Intern data available with email ${email}`, data:insertIntern})
    }
    catch (err) {
        next(err)
    }
}

module.exports = { addIntern }