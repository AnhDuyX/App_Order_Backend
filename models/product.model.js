const mongoose = require('mongoose');

const product = mongoose.model(
    "Product",
    mongoose.Schema({

        productName: {
            type: String, required: true, unquie: true,
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        },
        productShortDescription: {
            type: String,
            required: true,
        },
        productDescription: {
            type: String,
            required: false,
        },
        productPrice: {
            type: Number,
            required: true,
        },
        productSalePrice: {
            type: Number,
            required: true,
            default: 0,
        },
        productImage: {
            type: String,
        },

        productSKU: {
            type: String,
            required: false,
        },
        productType: {
            type: String,
            required: true,
            default: "simple"
        },
        productStatus: {
            type: String,
            default: "IN",
        },

        createdAt: {
            type: Date,
            required: true,
            default: Date.now,
        },

        relatedProducts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "RelatedProduct",
            }
        ]



    },

        {
            toJSON: {
                transform: function (doc, ret) {
                    ret.productId = ret._id.toString();
                    delete ret._id;
                    delete ret.__v;
                },
            },
        },)
);

module.exports = {
    product,
}

