const mongoose = require('mongoose');
const bcrypt = require('mongoose-bcrypt');

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
            match: ['/^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/', 'invalid_email']
        },
        phone: {
            type: String,
            trim: true,
            match: ['/^\\+?3?8?(0\\d{9})$/', 'invalid_phone']
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
            // bcrypt: true,
            trim: true
        }
    },
    {timestamps: true});

userSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(6), null);
};

userSchema.methods.validPassword = (password) => {
    return bcrypt.compareSync(password, this.password);
};

// userSchema.plugin(bcrypt);
module.exports = mongoose.model('User', userSchema);
