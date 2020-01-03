const ServiceError = require('../config/error.config');

const validate = (validator) => (req, res, next) => {
    if (!validator(req.body)) {
        return next(new ServiceError(validator.errors,
            ServiceError.STATUS.BAD_REQUEST,
            ServiceError.CODE.INVALID_BODY));
    }
    return next()
};

module.exports = validate;
