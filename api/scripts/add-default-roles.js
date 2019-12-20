const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const mongoConfig = require('../config/mongo');
const roles = require('../constants/user-roles');
const {createRoles} = require('../services/roles');
const ServiceError = require('../config/error');

const connectDB = () => {
    mongoose.connect(mongoConfig.MONGODB_URI, mongoConfig.CONNECTION_OPTIONS)
        .then(() => {
            createDefaultRoles(roles);
        })
        .catch(err => console.error(err));
};

const disconnectDB = () => {
    mongoose.disconnect();
};

const createDefaultRoles = (roles) => {
    createRoles(Object.values(roles)
        .map((roleName, index) => {
            return {name: roleName, level: index};
        }))
        .then(() => {
            console.log('Roles saved!');
            disconnectDB();
        })
        .catch(err => {
            console.error('Roles saving error!');
            console.error(new ServiceError(err,
                ServiceError.STATUS.INTERNAL_SERVER_ERROR,
                ServiceError.CODE.ERROR_MONGODB_SAVING));
            disconnectDB();
        });
};

connectDB();
