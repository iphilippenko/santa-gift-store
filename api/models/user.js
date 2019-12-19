const mongoose = require('mongoose');
const bcrypt = require('mongoose-bcrypt');
const {validateEmail} = require('../validators/email-validator');
const {validatePhone} = require("../validators/phone-validator");
const {CODE} = require('../config/error');

require('./user-role');

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
            validate: [validateEmail, CODE.INVALID_EMAIL]
        },
        phone: {
            type: String,
            trim: true,
            validate: [validatePhone, CODE.INVALID_PHONE]
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
