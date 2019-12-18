const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const mongoConfig = require('../config/mongo');
const {createUser, getUserInstance} = require('../services/users');
const adminConfig = require('../config/admin-user');
const {getRole} = require('../services/roles');

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
        user.role = mongoose.Types.ObjectId(role._id);
        try {
            await createUser(getUserInstance(user));
            console.log('User saved!');
        } catch (err) {
            console.log(`Cannot save user`);
            console.error(err);
        }
    }
};

connectDB();
