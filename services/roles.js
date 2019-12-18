const Role = require('../models/user-role');

const getRoleInstance = (roleObj) => {
    return new Role(roleObj);
};

const createRole = (roleInstance) => {
    return roleInstance.save();
};

const createRoles = (roleInstances) => {
    return Promise.all(roleInstances.map(role => createRole(role)));
};

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

