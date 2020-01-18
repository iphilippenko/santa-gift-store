const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const HttpError = require('./http-error.middleware');

const {
    getUser
} = require('../services/users.service');

passport.use('local-login',
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'firstName',
        session: false,
        passReqToCallback: true
    }, (req, username, password, done) => {
        console.log(req);
        console.log(username, password);
        // getUser('email', username)
        //     .then(user => {
        //         console.log(user);
        //         if (!user) {
        //             return done(new HttpError('User not found', 401), false);
        //         }
        //         return done(null, user);
        //     })
        //     .catch(done);
    }));


// module.exports = passport.authenticate(['api-key', 'local'], {session: false})
module.exports = passport;
