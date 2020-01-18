const User = require('../models/user.model');
const {getRoles} = require("./roles.service");

const usersCsvValidator = require('../validators/user-validators/users-csv.validator');
const {InvalidRequestError} = require("../middlewares/validation.middleware");

const HttpError = require('../middlewares/http-error.middleware');

const userRoles = require('../constants/user-roles');

// convert role to ObjectId, delete undefined values
const processUser = (user, removeEmpty = false) => {
    console.log(user);
    Object.keys(user)
        .forEach(key =>
            (typeof user[key] === 'undefined' || user[key] === null ||
                (removeEmpty && typeof user[key] === 'string' && !user[key].length)) &&
            delete user[key]);
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
            .select(selectPassword ?
                'password' :
                '')
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

const saveUsers = (users) => {
    return new Promise(async (res, rej) => {
        // remove empty strings, find role
        const nonValidRoles = users.filter(user => !Object.values(userRoles).includes(user.role));
        if (nonValidRoles.length) {
            rej(new HttpError(nonValidRoles.map(user => user.role).join(', ') + ' are not valid role types'), 400);
        } else {
            const roles = await getRoles();
            let usersToSave = users.map(user => {
                return processUser({
                    ...user,
                    role: roles.find(role => role.name === user.role)
                        ._id
                        .toString()
                }, true);
            });
            if (usersCsvValidator.errors) {
                rej(new InvalidRequestError(usersCsvValidator.errors));
            } else {
                res(Promise.all([...usersToSave.map(user => createOrUpdateUser(user))]));
            }
        }
    });

};

const createOrUpdateUser = async (user) => {
    try {
        let existingUser = await getUser('email', user.email);
        if (existingUser && existingUser._id) {
            return updateUserById(existingUser._id, user);
        }
    } catch (err) {
        return createUser(user);
    }

};

module.exports.getUserInstance = getUserInstance;
module.exports.createUser = createUser;
module.exports.createUsers = createUsers;
module.exports.getUsers = getUsers;
module.exports.getUser = getUser;
module.exports.updateUser = updateUserById;
module.exports.deleteUser = deleteUserById;
module.exports.saveUsers = saveUsers;
