const dotenv = require('dotenv')
    .config();
const express = require('express');
const path = require('path');
const compression = require('compression');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const router = require('./api/api-routes/router')();
const mongoConfig = require('./api/config/mongo');
const serverConfig = require('./api/config/server');
const distConfig = require('./api/config/dist')(path, __dirname);
const ServiceError = require('./api/config/error');

const app = express();

app
    .use(express.static(distConfig.ADMIN_DIST))
    .use(cors())
    .use(compression())
    .use(bodyParser.urlencoded({extended: false}))
    .use(bodyParser.json())
    .get('/*', (req, res, next) => {
        if (req.originalUrl.match(/\/api/g)) {
            next();
        } else {
            res.sendFile(path.resolve(distConfig.ADMIN_DIST, 'index.html'));
        }
    })
    .use('/api', router)
    .use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use((req, res) => res
        .status(ServiceError.STATUS.NOT_FOUND)
        .send(new ServiceError('not found',
            ServiceError.STATUS.NOT_FOUND,
            ServiceError.CODE.ERROR_NOT_FOUND)));

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
