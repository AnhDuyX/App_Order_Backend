const orderService = require("../services/order.service")

exports.create = (req, res, next) => {

    var model = {
        userId: req.user.userId,
        address: req.user.address,
        phone: req.user.phone,
        fullName: req.user.fullName
        // card_Name: req.body.card_Name,
        // card_Number: req.body.card_Number,
        // card_ExpMonth: req.body.card_ExpMonth,
        // card_ExpYear: req.body.card_ExpYear,
        // card_CVC: req.body.card_CVC,
        // amount: req.body.amount
    };

    orderService.createOrder(model, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: results
        })
    })
}

exports.update = (req, res, next) => {

    orderService.updateOrder(req.body, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: results
        })
    })
}

exports.findAll = (req, res, next) => {
    orderService.getOrders(req, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: results
        })
    })
}

exports.findAll = (req, res, next) => {
    orderService.getAllOrders(req, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: results
        })
    })
}

exports.delete = (req, res, next) => {
    orderService.deleteOrder(req.query.id, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: 'Success',
                data: results,
            });
        }
    });
};
