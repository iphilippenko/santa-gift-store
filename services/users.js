const User = require('../models/user');

const getUserInstance = (user) => {
    Object.keys(user).forEach(key => typeof user[key] === 'undefined' && delete user[key]);
    return new User(user);
};

const createUser = (userInstance) => {
    return userInstance.save();
};

const createUsers = (userInstances) => {
    return Promise.all(userInstances.map(user => createUser(user)));
};

const getUsers = () => {
    return new Promise(((resolve, reject) => {
        User
            .find({})
            .exec((err, roles) => {
                if (err) {
                    reject(err);
                }
                if (roles) {
                    resolve(roles);
                }
            });
    }))
};

const getUser = (searchKey, searchValue) => {
    return new Promise(((resolve, reject) => {
        User
            .findOne({[searchKey]: searchValue})
            .exec((err, role) => {
                if (role) {
                    resolve(role);
                } else {
                    reject(err);
                }
            });
    }))
};

module.exports.getUserInstance = getUserInstance;
module.exports.createUser = createUser;
module.exports.createUsers = createUsers;
module.exports.getUsers = getUsers;
module.exports.getUser = getUser;
