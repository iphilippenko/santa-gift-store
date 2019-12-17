const dotenv = require('dotenv').config();
const express = require('express');
const path = require('path');
const compression = require('compression');
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 5100;

const app = express();
const mongooseConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

app.use(cors());
app.use(compression());
app.use(express.static(__dirname + process.env.ADMIN_DIST));

app.get('/*', function (req, res, next) {
    res.sendFile(path.resolve(__dirname + process.env.ADMIN_DIST + '/index.html'));
});


app.listen(port, () => {
    connectDb();
    serverCb();
});

function connectDb() {
    console.log(process.env.MONGODB_URI);
    mongoose.connect(process.env.MONGODB_URI, mongooseConnectionOptions)
        .then(() => {
            console.log('Connected to db');
        })
        .catch(err => {
            console.error(err);
        });
}

function serverCb() {
    console.info(`Server is working on port ${port} =)`);
}
