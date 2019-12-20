const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const mongoConfig = require('../config/mongo');
const {createUser} = require('../services/users');
const adminConfig = require('../config/admin-user');
const {getRole} = require('../services/roles');
const ServiceError = require('../config/error');

const connectDB = () => {
    mongoose.connect(mongoConfig.MONGODB_URI, mongoConfig.CONNECTION_OPTIONS)
        .then(() => {
            createAdmin(adminConfig).finally(() => disconnectDB());
        })
        .catch(err => console.error(err));
};

const disconnectDB = () => {
    mongoose.disconnect();
};

// fild role by name
const findRole = async (roleName) => {
    let role;
    try {
        role = await getRole('name', roleName);
    } catch (err) {
        console.log(`Cannot find role ${roleName}`);
        console.error(err);
    }
    return role;
};

const createAdmin = async (user) => {
    let role = await findRole(user.role);
    if (role) {
        user.role = role._id;
        try {
            await createUser(user);
            console.log('User saved!');
        } catch (err) {
            console.log(`Cannot save user`);
            console.error(new ServiceError(err,
                ServiceError.STATUS.INTERNAL_SERVER_ERROR,
                ServiceError.CODE.ERROR_MONGODB_SAVING));
        }
    }
};

connectDB();
