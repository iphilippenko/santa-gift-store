const mongooseError = require('mongoose').Error;

class ServiceError extends Error {
    constructor(message, statusCode, errorCode) {
        if (arguments.length === 1 && message instanceof mongooseError) {
            const err = arguments[0];
            super(message);
            this.convertMongooseError(err);
            return;
        }

        let isObj = typeof message === 'object';

        if (isObj) {
            message = message.message;
            statusCode = message.statusCode;
        }

        super(message);

        this.statusCode = statusCode || 500;
        this.errors = [];

        if (!errorCode) {
            console.error('missing errorCode for ' + message);
        }

        this.errorCode = errorCode;
    }

    convertMongooseError(err) {
        this.errors = err.errors;
        this.errorCode = err.name;
        this.statusCode = statusCodes.BAD_REQUEST;
    }
}

const statusCodes = {
    SUCCESS: 200,
    RESOURCE_CREATED: 201,
    RESOURCE_UPDATED: 204,
    BAD_REQUEST: 400,
    NOT_AUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    METHOD_NOT_ALLOWED: 405,
    INTERNAL_SERVER_ERROR: 500,
    LOGIN_TIME_OUT: 440
};

const errorCodes = {
    ERROR_MONGODB_SAVING: 'error_save_database',
    ERROR_MONGODB_FIND: 'error_find_database',
    ERROR_MONGODB_DELETE: 'error_delete_database',
    ERROR_EMPTY_EMAIL: 'error_empty_email_fields',
    ERROR_SERVER: 'error_server',
    ERROR_EMAIL_ALREADY_TAKEN: 'error_email_already_taken',
    INVALID_EMAIL: 'invalid_email',
    INVALID_USERS_NOT_FOUND: 'invalid_users_not_found',
    INVALID_DUPLICATE_PROMOCODE: 'invalid_duplicate_promocode',
    INVALID_DUPLICATE_MONGODB_SAVE: 'invalid_duplicate_mongodb_save',
    //PERMISSIONS
    INVALID_PERMISSION: 'invalid_permission'
};

module.exports = ServiceError;
module.exports.STATUS = statusCodes;
module.exports.CODE = errorCodes;
