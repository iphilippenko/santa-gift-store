const mongoose = require('mongoose');

const userRoles = require('../constants/user-roles');

const userRoleSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            unique: true,
            enum: [...Object.values(userRoles)],
            default: userRoles.USER
        },
        level: {
            type: Number,
            // min: 0,
            // max: 3,
            // required: true,
            // unique: true,
            // index: true
        }
    },
    {timestamps: false});

module.exports = mongoose.model('Role', userRoleSchema);
