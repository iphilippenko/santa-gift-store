const dotenv = require('dotenv').config();
const express = require('express');
const path = require('path');
const compression = require('compression');
const cors = require('cors');
const mongoose = require('mongoose');

const mongoConfig = require('./config/mongo');
const serverConfig = require('./config/server');
const distConfig = require('./config/dist')(path, __dirname);

const app = express();

app
    .use(express.static(distConfig.ADMIN_DIST))
    .use(cors())
    .use(compression());

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(distConfig.ADMIN_DIST, 'index.html'));
});


app.listen(serverConfig.PORT, () => {
    connectDb();
    serverCb();
});

const connectDb = () => {
    mongoose.connect(mongoConfig.MONGODB_URI, mongoConfig.CONNECTION_OPTIONS)
        .then(() => console.log('************\nConnected to db\n************'))
        .catch(err => console.error(err));
};

const serverCb = () => {
    console.log(`************\nServer is working on port ${serverConfig.PORT} =)\n************`);
};
