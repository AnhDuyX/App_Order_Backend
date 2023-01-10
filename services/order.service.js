const { user } = require("../models/user.model");
const { cards } = require("../models/card.model");
const { order } = require("../models/order.model");
const { cart } = require("../models/cart.model")

const stripeService = require("../services/stripe.service");
const cartService = require("../services/cart.service");
const { response } = require("express");
const { findOne } = require("../controllers/products.controller");

async function createOrder(params, callback) {
    userIdNew = params.userId;
    fullName = params.fullName;

    user.findOne({ _id: params.userId }, async function (err, userDB) {
        if (err) {
            return callback(err);
        } else {
            var model = {};



            cartService.getCart({ userId: userIdNew }, function (err, cartDB) {

                if (err) {
                    return callback(err);
                } else {
                    if (cartDB) {
                        var products = [];
                        var grandTotal = 0;

                        cartDB.products.forEach(product => {
                            products.push({
                                product: product.product._id,
                                qty: product.qty,
                                amount: product.product.productSalePrice
                            });
                            grandTotal += product.product.productSalePrice * product.qty
                        });

                        const orderModel = new order({
                            userId: cartDB.userId,
                            fullName: userDB.fullName,
                            products: products,
                            orderStatus: "Chưa Xác Nhận",
                            grandTotal: grandTotal,
                            address: params.address,
                            phone: params.phone

                        });

                        orderModel
                            .save()
                            .then((response) => {
                                model.orderId = response._id;
                                return callback(null, model);
                            })
                            .catch((error) => {
                                return callback(error);
                            })
                    }
                }
            })
        }
        //         })
        //     }
        // 
    }
    )
}

async function updateOrder(params, callback) {

    var model = {
        orderStatus: params.status,
    };

    order.findByIdAndUpdate(params.orderId, model, { useFindAndModify: false })
        .then((response) => {
            if (!response) {
                callback("Order Upadate Khong Duoc")
            } else {
                if (params.status == "success") {

                }
                return callback(null, "Update success");
            }
        })
        .catch((error) => {
            return callback(error);
        })
}

async function getOrders(params, callback) {
    order.findOne({ orderId: params.orderId })
        .populate({
            path: "products",
            populate: {
                path: "product",
                model: "Product",
                populate: {
                    path: "category",
                    model: "Category",
                    select: "categoryName"
                }
            }
        })
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        })
}

async function getAllOrders(params, callback) {
    order.find(params, "")
        .populate({
            path: "products",
            populate: {
                path: "product",
                model: "Product",
                populate: {
                    path: "category",
                    model: "Category",
                    select: "categoryName"
                }
            }
        })
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        })
}

async function deleteOrder(id, callback) {
    const orderId = id;

    order
        .findByIdAndRemove(orderId)
        .then((response) => {
            if (!response) callback('Cannot update Product with Id ${productId}');
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

module.exports = {
    createOrder,
    updateOrder,
    getOrders,
    getAllOrders,
    deleteOrder
}