const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const mongoConfig = require('../config/mongo');
const Role = require('../models/user-role');
const roles = require('../constants/user-roles');

const connectDB = () => {
    mongoose.connect(mongoConfig.MONGODB_URI, mongoConfig.CONNECTION_OPTIONS)
        .then(() => {
            createRoles();
        })
        .catch(err => console.error(err));
};

const disconnectDB = () => {
    mongoose.disconnect();
};

const createRoles = () => {
    Promise.all(Object.values(roles).map((roleName, index) => {
        let role = new Role({name: roleName, type: index});
        return role.save();
    })).then(() => {
        console.log('Roles saved!');
        disconnectDB();
    }).catch(err => {
        console.error('Roles saving error!');
        console.error(err);
        disconnectDB();
    });
};

connectDB();
