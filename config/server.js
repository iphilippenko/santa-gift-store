const FALLBACK_PORT = 5100;
const FALLBACK_BASE_URL = 'http://localhost/';

module.exports = {
    PORT: process.env.PORT || FALLBACK_PORT,
    BASE_URL: process.env.BASE_URL || FALLBACK_BASE_URL
};
