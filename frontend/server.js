const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);

        process.on('SIGILL', signal => {
            console.log(signal);
        });
    }).listen(4000, err => {
        if (err) {
            console.log(err);
            throw err;
        }
    });
});
