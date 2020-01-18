const express = require('express');
const router = express.Router();
const passportMiddleware = require('../middlewares/passport.middleware');


const passport = require('../middlewares/passport.middleware');

router.post('/auth/login',
    passport.authenticate('local-login'),
    (req, res, next) => {
        // console.log(req.body);
        // res.status(200)
        //     .send('Login');
        // next();
    });

module.exports = router;
