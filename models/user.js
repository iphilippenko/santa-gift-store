const mongoose = require('mongoose');
const bcrypt = require('mongoose-bcrypt');

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
            unique: true
        },
        phone: {
            type: String,
            trim: true
        },
        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role',
            required: true
        },
        password: {
            type: String,
            select: false,
            minlength: 6,
            bcrypt: true,
            trim: true
        }
    },
    {timestamps: true});

userSchema.plugin(bcrypt);
module.exports = mongoose.model('User', userSchema);
