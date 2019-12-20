const express = require('express');
const router = express.Router();

const {getRole, getRoles} = require('../services/roles');
const ServiceError = require('../config/error');

router.get('/roles', (req, res) => {
    getRoles()
        .then(roles => {
            res.status(ServiceError.STATUS.SUCCESS)
                .send(roles);
        })
        .catch(err => {
            res
                .status(ServiceError.STATUS.INTERNAL_SERVER_ERROR)
                .send(new ServiceError(err,
                    ServiceError.STATUS.INTERNAL_SERVER_ERROR,
                    ServiceError.CODE.ERROR_MONGODB_SAVING));
        })
});

router.get('/roles/:id', (req, res) => {
    getRole('_id', req.params.id)
        .then(role => {
            res.status(ServiceError.STATUS.SUCCESS)
                .send(role);
        })
        .catch(err => {
            res
                .status(ServiceError.STATUS.NOT_FOUND)
                .send(new ServiceError(err,
                    ServiceError.STATUS.NOT_FOUND,
                    ServiceError.CODE.ERROR_NOT_FOUND));
        })
});

module.exports = router;
