const { user } = require('../models/user.model');
const bcrypt = require("bcryptjs")
const auth = require("../middleware/auth");

async function login({ email, password }, callback) {





    const userModel = await user.findOne({ email });
    if (userModel != null) {
        if (bcrypt.compareSync(password, userModel.password)) {
            const token = auth.generateAccessToken(userModel.toJSON());

            return callback(null, { ...userModel.toJSON(), token });
        } else {
            return callback({
                message: "Invalid Email/Password"
            })
        }
    } else {
        return callback({
            message: "Invalid Email/Password"
        })
    }
}

async function register(data, callback) {

    if (data.email === undefined) {

        return callback({
            message: "No email"
        })
    }

    let isUserExist = await user.findOne({ email: data.email });


    if (isUserExist) {

        return callback({
            message: "Email already registered!"

        });
    }


    const salt = await bcrypt.genSalt(10);
    const hased = await bcrypt.hash(data.password, salt);
    let obj = {}
    obj.email = data.email;
    obj.password = hased;
    obj.fullName = data.fullName;
    obj.address = data.address;
    obj.phone = data.phone

    const userSchema = new user(obj);
    userSchema.save()
        .then((response) => {
            return callback(null, response);

        })
        .catch((error) => {
            return callback(error);
        })
}

async function getUsers(params, callback) {
    user
        .find(params, "fullName email address phone")
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        })
}

async function deleteUser(id, callback) {
    const userId = id;

    user
        .findByIdAndRemove(userId)
        .then((response) => {
            if (!response) callback("Not Found")
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        })
}


module.exports = {
    login,
    register,
    getUsers,
    deleteUser
}