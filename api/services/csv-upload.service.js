const Busboy = require('busboy');
const neatCsv = require('neat-csv');

const HttpError = require('../middlewares/http-error.middleware');
const {saveUsers} = require("./users.service");

const processCsvFile = (req, res, next) => {
    const busboy = new Busboy({headers: req.headers});

    busboy.on('file', (fieldname, file, filename) => {
        if (!(/\.csv$/).test(filename)) {
            return next(new HttpError('File wrong extension', 400));
        }
        let stream = [];
        file.on('data', (data) => {
            stream.push(data);
        });
        file.on('end', async () => {
            const csvBuffer = Buffer.concat(stream);
            let csv = [];

            try {
                csv = await neatCsv(csvBuffer);
            } catch (err) {
                return next(new HttpError('Error while parsing csv', 400));
            }

            if (!csv.length) {
                return next(new HttpError('Empty CSV was uploaded', 400));
            }

            saveUsers(csv)
                .then(data => {
                    res.status(200).send(data);
                })
                .catch(err => {
                    return next(err);
                });
        });
    });
    req.pipe(busboy);
};

module.exports.processCsvFile = processCsvFile;
