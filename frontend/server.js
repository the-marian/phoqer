const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const PORT = 4000;
const HOST = process.env.HOST || '0.0.0.0';

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        createServer((req, res) => {
            const parsedUrl = parse(req.url, true);
            handle(req, res, parsedUrl).catch(error => {
                console.log('---LOGGER-FOR-MARIAN---', error);
            });
        }).listen(PORT, err => {
            if (err) {
                console.log('---LOGGER-FOR-MARIAN---', err);
                throw err;
            }

            process.on('SIGILL', signal => {
                console.log('---LOGGER-FOR-MARIAN---', signal);
            });
            console.log('Front-end is run on port: ' + PORT + ', end host: ' + HOST);
        });
    })
    .catch(error => {
        console.log('---LOGGER-FOR-MARIAN---', error);
    });
