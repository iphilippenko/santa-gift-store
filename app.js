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
const mongoConfig = require('./api/config/mongo.config');
const serverConfig = require('./api/config/server.config');
const distConfig = require('./api/config/dist.config')(path, __dirname);

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
    .use((error, req, res, next) => {
        if (error.status) {
            console.log(error);
            res.status(error.status).json(error);
        } else {
            res.status(500).send(new Error('Uncaught exception!'));
        }
        next()
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
