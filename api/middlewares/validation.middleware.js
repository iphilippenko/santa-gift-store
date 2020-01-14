const HttpError = require('./http-error.middleware');

class InvalidRequestError extends HttpError {
    constructor (errors, msg = 'Invalid data') {
        super(msg);
        this.errors = errors;
        this.name = 'ValidationError';
    }

    toJSON() {
        return {
            status: this.status,
            message: this.message,
            name: this.name,
            errors: this.errors.map(error => error.message)
        }
    }
}

let validate = (validator, ...args) => (req, res, next) => {
    let validatorFnc;
    if (args.length > 0) {
        validatorFnc = validator(...args.map(arg => arg(req)));
    } else {
        validatorFnc = validator;
    }

    if (!validatorFnc(req.body)) {
        return next(new InvalidRequestError(validatorFnc.errors));
    }
    next();
};

module.exports = validate;
