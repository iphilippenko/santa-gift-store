module.exports = (path, __dirname) => {
    return {
        ADMIN_DIST: path.resolve(__dirname + process.env.ADMIN_DIST)
    };
};
