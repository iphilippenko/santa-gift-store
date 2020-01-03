const mongoose = require('mongoose');
const bcrypt = require('mongoose-bcrypt');
const {CODE} = require('../config/error.config');

require('./user-role.model');

const userSchema = new mongoose.Schema({
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            match: ['/^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/', CODE.INVALID_EMAIL]
        },
        phone: {
            type: String,
            trim: true,
            validate: ['/^\\+?3?8?(0\\d{9})$/', CODE.INVALID_PHONE]
        },
        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role',
            required: true
        },
        password: {
            type: String,
            select: false,
            minlength: [6, 'Too short password'],
            bcrypt: true,
            trim: true
        }
    },
    {timestamps: true});

userSchema.plugin(bcrypt);
module.exports = mongoose.model('User', userSchema);
