const express = require('express');
const router = express.Router();

const ServiceError = require('../config/error');
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require('../services/users');

router.get('/users', (req, res) => {
    getUsers()
        .then(users => {
            res.status(ServiceError.STATUS.SUCCESS)
                .send(users);
        })
        .catch(err => {
            res
                .status(ServiceError.STATUS.INTERNAL_SERVER_ERROR)
                .send(new ServiceError(err,
                    ServiceError.STATUS.INTERNAL_SERVER_ERROR,
                    ServiceError.CODE.ERROR_MONGODB_SAVING));
        })
});

router.post('/users', (req, res) => {
    console.log(req.body);
    createUser(req.body)
        .then(user => {
            res.status(ServiceError.STATUS.SUCCESS)
                .send(user);
        })
        .catch(err => {
            console.error(err);
            res
                .status(ServiceError.STATUS.INTERNAL_SERVER_ERROR)
                .send(new ServiceError(err,
                    ServiceError.STATUS.INTERNAL_SERVER_ERROR));
        })
});

router.get('/users/:id', (req, res) => {
    getUser('_id', req.params.id)
        .then(user => {
            res.status(ServiceError.STATUS.SUCCESS)
                .send(user);
        })
        .catch(err => {
            res
                .status(ServiceError.STATUS.NOT_FOUND)
                .send(new ServiceError(err,
                    ServiceError.STATUS.NOT_FOUND,
                    ServiceError.CODE.ERROR_NOT_FOUND));
        })
});

router.put('/users/:id', (req, res) => {
    updateUser(req.params.id, req.body)
        .then(user => {
            res.status(ServiceError.STATUS.SUCCESS)
                .send(user);
        })
        .catch(err => {
            res
                .status(ServiceError.STATUS.NOT_FOUND)
                .send(new ServiceError(err,
                    ServiceError.STATUS.NOT_FOUND,
                    ServiceError.CODE.ERROR_NOT_FOUND));
        })
});

router.delete('/users/:id', (req, res) => {
    deleteUser(req.params.id)
        .then(user => {
            res.status(ServiceError.STATUS.SUCCESS)
                .send(user);
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
