const express = require('express');
const router = express.Router();
const {STATUS} = require('../config/error.config');

router.get('/', (req, res) => {
    res.status(STATUS.SUCCESS)
        .send({api: {status: 'success'}});
});

module.exports = router;
