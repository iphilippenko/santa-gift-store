const express = require('express');
const router = express.Router();

const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require('../services/users.service');
const validate = require('../middlewares/validation.middleware');
const createValidator = require('../validators/user-validators/user-create.validator');
const editValidator = require('../validators/user-validators/user-edit.validator');

router.get('/users', (req, res, next) => {
    getUsers()
        .then((users) => res.send(users))
        .catch(next)
});

router.post('/users', validate(createValidator), (req, res, next) => {
    console.log(req.body);
    createUser(req.body)
        .then((user) => res.send(user))
        .catch(next)
});

router.get('/users/:id', (req, res, next) => {
    getUser('_id', req.params.id)
        .then((user) => res.send(user))
        .catch(next)
});
//
router.put('/users/:id', validate(editValidator), (req, res, next) => {
    console.log(req.params.id);
    console.log(req.body);
    updateUser(req.params.id, req.body)
        .then((user) => {
            console.log('USER THEN');
            console.log(user);
            res.send(user)
        })
        .catch(next)
});

router.delete('/users/:id', (req, res, next) => {
    deleteUser(req.params.id)
        .then((user) => res.send(user))
        .catch(next)
});

module.exports = router;
