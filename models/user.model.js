const mongoose = require('mongoose');

const user = mongoose.model(
    'User',
    mongoose.Schema({
        userId: {
            type: String,
            require: true,
        },
        fullName: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
            unique: true,
        },
        password: {
            type: String,
            require: true,
        },
        address: {
            type: String,
            require: true,
        },
        phone: {
            type: String,
            require: true,
        }
    },
        {
            toJSON: {
                transform: function (doc, ret) {
                    ret.userId = ret._id.toString();
                    delete ret._id;
                    delete ret.__v;
                    delete ret.password;
                },
            },
        },
        {
            timestamps: true
        }
    )
);

module.exports = {
    user
}