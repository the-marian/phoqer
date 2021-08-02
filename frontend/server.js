const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const PORT = 4000;
const HOST = process.env.HOST || '0.0.0.0';
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl).catch(error => {
            console.log('---LOGGER-FOR-MARIAN---', error);
        });
        process.on('SIGILL', signal => {
            console.log('---LOGGER-FOR-MARIAN---', signal);
        });
    }).listen(PORT, HOST, err => {
        if (err) {
            console.log('---LOGGER-FOR-MARIAN---', err);
            throw err;
        }
        console.log('Front-end is run on port: ' + PORT + ', end host: ' + HOST);
    });
});
