const express = require('express');
const router = express.Router();
const passportMiddleware = require('../middlewares/passport.middleware');


const passport = require('../middlewares/passport.middleware');

router.post('/auth/login',
    (req, res, next) => {
        console.log(req.body);
        return passport.authenticate('local-login', null, (req, res, info) => {
            console.log(req);
            console.log(res);
            console.log('info', info);
        })(req, res, next)
        // res.status(200)
        //     .send('Login');
        // next();
    });

module.exports = router;
