const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const HttpError = require('./http-error.middleware');

const {
    getUser
} = require('../services/users.service');

passport.use('local-login',
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false,
        passReqToCallback: true
    }, (req, username, password, done) => {
        console.log(username, password);
        getUser('email', username, true)
            .then(user => {
                if (!user) {
                    return done(new HttpError('User not found', 401), false);
                }
                // TODO: crypt passwords

                if (user.password !== password) {
                    console.log('pass invalid');
                    return done(new HttpError('Password not valid', 401), false);
                }
                return done(null, user);
            })
            .catch(() => {
                return done(new HttpError('User not found', 401), false)
            });
    }));


// module.exports = passport.authenticate(['api-key', 'local'], {session: false})
module.exports = passport;
