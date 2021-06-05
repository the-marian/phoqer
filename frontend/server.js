const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const PORT = 4000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
        process.on('SIGILL', signal => {
            console.log('---LOGGER-FOR-MARIAN---');
            console.log(signal);
        });
    }).listen(PORT, err => {
        if (err) {
            console.log(err);
            throw err;
        }
        console.log('Start front-end dich on port: ' + PORT);
    });
});
