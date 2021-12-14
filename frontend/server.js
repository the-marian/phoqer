const next = require('next');

const { createServer } = require('http');
const { join } = require('path');
const { parse } = require('url');

const PORT = 4000;

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        const { pathname } = parsedUrl;

        if (pathname === '/sw.js' || /^\/(workbox|worker|fallback)-\w+\.js$/.test(pathname)) {
            const filePath = join(__dirname, '.next', pathname);
            app.serveStatic(req, res, filePath);
        } else {
            handle(req, res, parsedUrl);
        }
    }).listen(PORT, () => console.log('Front-end is run on port: ' + PORT));
});
