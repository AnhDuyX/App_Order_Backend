const mongoose = require("mongoose");
const order = mongoose.model(
    "Order",
    mongoose.Schema({
        userId: {
            type: String,
            required: true
        },
        products: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                require: true
            },
            amount: {
                type: Number,
                required: true
            },
            qty: {
                type: Number,
                required: true
            }
        }],
        grandTotal: {
            type: Number,
            require: true
        },
        orderStatus: {
            type: String,
            require: true
        },
        transactionId: {
            type: String,
        },
        address: {
            type: String,
            require: true
        },
        phone:
        {
            type: String,
            require: true
        },
        fullName: {
            type: String,
            require: true
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now,
        },


    },
        {
            toJSON: {
                transform: function (doc, ret) {
                    ret.orderId = ret._id.toString();
                    delete ret._id;
                    delete ret.__v;
                    delete ret.password;
                },
            },
        },
        {
            timestamps: true
        })
)

module.exports = {
    order
}