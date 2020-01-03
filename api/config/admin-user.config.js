const roles = require('../constants/user-roles');

module.exports = {
    email: process.env.ADMIN_EMAIL,
    role: roles.BIG_FAT_ADMIN,
    password: process.env.ADMIN_PASS || undefined
};
