const { relatedProduct } = require('../models/related-products.model');
const { product } = require('../models/product.model');

async function addRelatedProduct(params, callback) {
    console.log(params.product);
    if (!params.product) {
        return callback({
            message: "No Product Id"
        });
    }
    console.log(params.relatedProduct);
    if (!params.relatedProduct) {
        return callback({
            message: "No Related Product Id"
        });
    }

    const relatedProductModel = new relatedProduct(params);
    relatedProductModel
        .save()
        .then(async (response) => {
            await product.findOneAndUpdate({
                _id: params.product
            },

                {
                    $addToSet: {
                        "relatedProducts": relatedProductModel
                    }
                })
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        })
}

async function removeRelatedProduct(params, callback) {
    const id = params.id;

    relatedProduct.findByIdAndRemove(id)
        .then((response) => {
            if (!response) {
                callback("Product Id not found")
            } else {
                callback(null, response);
            }

        })
        .catch((error) => {
            return callback(error);
        })
}

module.exports = {
    addRelatedProduct,
    removeRelatedProduct,
}