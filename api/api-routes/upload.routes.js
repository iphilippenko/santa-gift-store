const express = require('express');
const {processCsvFile} = require("../services/csv-upload.service");
const router = express.Router();

router.post('/upload-csv', (req, res, next) => {
    console.log('req');
    // console.log(req.body);
    processCsvFile(req, res, next);
});

module.exports = router;
