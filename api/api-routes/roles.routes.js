const express = require('express');
const router = express.Router();

const {getRole, getRoles} = require('../services/roles.service');

router.get('/roles', (req, res, next) => {
    getRoles()
        .then(roles => {
            res.send(roles);
        })
        .catch(next)
});

router.get('/roles/:id', (req, res, next) => {
    getRole('_id', req.params.id)
        .then(role => {
            res.send(role);
        })
        .catch(next)
});

module.exports = router;
