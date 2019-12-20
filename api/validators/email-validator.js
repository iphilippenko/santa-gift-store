/* eslint-disable no-useless-escape */
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const validateEmail = (email) => {
    return emailRegex.test(email);
};

module.exports.validateEmail = validateEmail;
