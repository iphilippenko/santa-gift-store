require('dotenv').config();
const mongoose = require('mongoose');
const mongoConfig = require('../config/mongo.config');
const roles = require('../constants/user-roles');
const {createRoles} = require('../services/roles.service');

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
            return {
                name: roleName,
                level: index
            };
        }))
        .then(() => {
            console.log('Roles saved!');
            disconnectDB();
        })
        .catch(err => {
            console.error('Roles saving error!');
            console.error(err);
            disconnectDB();
        });
};

connectDB();
