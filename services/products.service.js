const { category } = require('../models/category.model');
const { product } = require('../models/product.model');

const { MONGO_DB_CONFIG } = require('../config/app_config');
const { response } = require('express');

async function createProduct(params, callback) {
    if (!params.productName) {
        return callback(
            {
                message: 'Product Name Required',
            },
            '',
        );
    }
    if (!params.category) {
        return callback(
            {
                message: 'Category Required',
            },
            '',
        );
    }
    const productModel = new product(params);
    productModel.save()
        .then((response) => {
            return callback(null, response)
        })
        .catch((error) => {
            return callback(err);
        })
}

async function getProducts(params, callback) {
    const productName = params.productName;
    const categoryId = params.categoryId;
    var condition = {};

    if (productName) {
        condition["productName"] = {
            $regex: new RegExp(productName), $options: "i"
        };
    }
    if (categoryId) {
        condition["category"] = categoryId;
    }

    if (params.productIds) {
        condition["productId"] = {
            $in: params.productIds.split(",")
        };
    }


    let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE;
    let page = (Math.abs(params.page) || 1) - 1;

    product
        .find(condition, "productId productName productShortDescription productDescription productPrice productSalePrice productImage productSKU productType productStatus createdAt updatedAt")
        .sort(params.sort)
        .populate("category", "categoryName categoryImage")
        .populate("relatedProducts", "relatedProduct")
        .limit(perPage)
        .skip(perPage * page)
        .then((response) => {

            var res = response.map(r => {
                if (r.relatedProducts.length > 0) {
                    r.relatedProducts = r.relatedProducts.map(x => x.relatedProduct);
                }
                return r;
            });

            return callback(null, response);

        })
        .catch((error) => {
            return callback(error);
        });
}

async function getProductById(params, callback) {
    const productId = params.productId;

    product
        .findById(productId)
        .populate("category", "categoryName categoryImage")
        .populate("relatedProducts", "relatedProduct")
        .then((response) => {
            response.relatedProducts = response.relatedProducts.map(x => { return x.relatedProduct });
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function updateProduct(params, callback) {
    const productId = params.productId;

    product
        .findByIdAndUpdate(productId, params, { useFindAndModify: false })
        .populate("category", "categoryName categoryImage")
        .then((response) => {
            if (!response) callback('Cannot update Product with Id ${productId}');
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function deleteProduct(params, callback) {
    const productId = params.productId;

    product
        .findByIdAndRemove(productId)
        .then((response) => {
            if (!response) callback('Cannot update Product with Id ${productId}');
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
}
