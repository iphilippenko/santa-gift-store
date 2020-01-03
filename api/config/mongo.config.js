module.exports = {
    MONGODB_URI: process.env.MONGODB_URI,
    DB_NAME: process.env.DB_NAME,
    CONNECTION_OPTIONS: {
        useFindAndModify: false,
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: process.env.DB_NAME,
        user: process.env.MONGODB_LOGIN,
        pass: process.env.MONGODB_PASSWORD
    }
};
