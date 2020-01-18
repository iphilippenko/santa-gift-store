const User = require('../models/user.model');
const {Types} = require('mongoose');

// convert role to ObjectId, delete undefined values
const processUser = (user) => {
    if (user.role) {
        user.role = Types.ObjectId(user.role);
    }
    Object.keys(user)
        .forEach(key => (typeof user[key] === 'undefined' || user[key] === null) && delete user[key]);
    return user;
};

const getUserInstance = (user) => {
    return new User(processUser(user));
};

// create user
const createUser = (user) => {
    return getUserInstance(user)
        .save();
};

// create users
const createUsers = (users) => {
    return Promise.all(users
        .map(user =>
            createUser(user)));
};

// get all users
const getUsers = () => {
    return new Promise(((resolve, reject) => {
        User
            .find({})
            .populate('role')
            .exec((err, users) => {
                if (err) {
                    reject(err);
                }
                if (users) {
                    resolve(users);
                }
            });
    }))
};

// get user by search key
const getUser = (searchKey, searchValue, selectPassword = false) => {
    return new Promise(((resolve, reject) => {
        User
            .findOne({[searchKey]: searchValue})
            .select(selectPassword ? 'password' : '')
            .populate('role')
            .exec((err, user) => {
                if (user) {
                    resolve(user);
                } else {
                    reject(err);
                }
            });
    }))
};

// update user by is
const updateUserById = (id, user) => {
    return new Promise(((resolve, reject) => {
        User
            .findByIdAndUpdate(id, user, {new: true})
            .populate('role')
            .exec((err, user) => {
                console.log('updateUserById');
                console.log(err);
                console.log(user);
                if (user) {
                    resolve(user);
                } else {
                    reject(err);
                }
            });
    }))
};

// delete user by id
const deleteUserById = (id) => {
    return new Promise(((resolve, reject) => {
        User
            .findByIdAndDelete(id)
            .populate('role')
            .exec((err, user) => {
                if (user) {
                    resolve(user);
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
module.exports.updateUser = updateUserById;
module.exports.deleteUser = deleteUserById;
