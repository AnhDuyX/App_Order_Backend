const { user } = require('../models/user.model');
const bcrypt = require("bcryptjs")
const auth = require("../middleware/auth");

async function login({ email, password }, callback) {

    console.log(email, password)



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
    console.log(data);
    if (data.email === undefined) {
        console.log(data.email);
        return callback({
            message: "No email"
        })
    }

    let isUserExist = await user.findOne({ email: data.email });
    console.log(isUserExist);

    if (isUserExist) {
        console.log(isUserExist);
        return callback({
            message: "Email already registered!"

        });
    }

    // const salt = 10;
    // bcrypt.genSalt(salt, function (err, salt) {
    //     bcrypt.hash(data.password, salt, function (err, hash) {

    //         // Store hash in database here
    //     });
    // });
    const salt = await bcrypt.genSalt(10);
    const hased = await bcrypt.hash(data.password, salt);
    let obj = {}
    obj.email = data.email;
    obj.password = hased;
    obj.fullName = data.fullName;
    console.log('check obj', obj)
    const userSchema = new user(obj);
    userSchema.save()
        .then((response) => {
            return callback(null, response);

        })
        .catch((error) => {
            return callback(error);
        })



}

module.exports = {
    login,
    register,
}