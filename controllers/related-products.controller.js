const relatedProductService = require("../services/related-products.service");

exports.create = (req, res, next) => {
    relatedProductService.addRelatedProduct(req.body, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: 'Success',
                data: results,
            });
        }
    })

};

exports.delete = (req, res, next) => {
    var model = {
        id: req.params.id,
    }
    relatedProductService.removeRelatedProduct(model, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: results
        })
    })

};