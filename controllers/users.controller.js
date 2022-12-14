const userServices = require("../services/users.service")

exports.register = (req, res, next) => {
    userServices.register(req.body, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: results
        });
    });
};

exports.login = (req, res, next) => {
    const { email, password } = req.body;

    userServices.login({ email, password }, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: results
        });
    });
}

exports.findAll = (req, res, next) => {
    userServices.getUsers(req, (error, results) => {
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
exports.delete = (req, res, next) => {

    userServices.deleteUser(req.query.id, (error, results) => {
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

exports.userProfile = (req, res, next) => {
    return res.status(200).json({ message: "data" });
}