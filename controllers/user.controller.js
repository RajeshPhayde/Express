const { invitationMail, sendOtp } = require("../helpers/mailHelper");
const User = require("../models/user.model");
const { StatusCodes } = require("http-status-codes");

let createUser = async (req, res, next) => {
    try {
        let { name, age, email, profile } = req.body;

        console.log(req.file);

        //! altering the path of file and storing in db
        let port = "http://localhost:4500";
        // let path=req.file.path.replace("public","");
        console.log(path)
        let path = req.file.path.split("public")[1];
        let imagePath = port + path;

        //! altering the path of file and storing in db

        let isAvailable = await User.findOne({ email });
        if (isAvailable) {
            return res.status(StatusCodes.CONFLICT).json({
                error: true,
                message: `User already exists with given email ${email}`,
            });
        }

        let newUser = await User.create({ name, age, email, profile: imagePath });
        return res.status(StatusCodes.CREATED).json({
            error: false,
            message: `User data created with email ${email}`,
            data: newUser,
        });
    } catch (err) {
        next(err);
    }
};

let getUsers = async (req, res, next) => {
    try {
        let users = await User.find({});
        if (users.length == 0) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ error: true, message: `Users not available` });
        }
        return res
            .status(StatusCodes.OK)
            .json({
                error: false,
                message: `User data fetched successfully`,
                data: users,
            });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createUser,
    getUsers,
};
