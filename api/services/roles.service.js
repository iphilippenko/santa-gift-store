const Role = require('../models/user-role.model');

const getRoleInstance = (roleObj) => {
    return new Role(roleObj);
};

// create role
const createRole = (role) => {
    return getRoleInstance(role)
        .save();
};

// create roles
const createRoles = (roles) => {
    return Promise.all(roles
        .map(role =>
            createRole(role)));
};

// get all roles
const getRoles = () => {
    return new Promise(((resolve, reject) => {
        Role
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

// get role by search key
const getRole = (searchKey, searchValue) => {
    return new Promise(((resolve, reject) => {
        Role
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

module.exports.getRoleInstance = getRoleInstance;
module.exports.createRole = createRole;
module.exports.createRoles = createRoles;
module.exports.getRoles = getRoles;
module.exports.getRole = getRole;

