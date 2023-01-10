const infoService = require("../services/info.service");

exports.create = (req, res, next) => {
    const model = {
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone
    };

    infoService.createInfo(model, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: 'Success',
                data: results,
            });
        }
    });
}