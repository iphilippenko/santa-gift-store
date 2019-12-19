const phoneRegex = /^\+?3?8?(0\d{9})$/;

const validatePhone = (phone) => {
    return phoneRegex.test(phone);
};

module.exports.validatePhone = validatePhone;
