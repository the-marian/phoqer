import morgan from 'morgan';
import express from 'express';
import cors from 'cors';

import translations from './api/translations/translations.routes.js';
import config from './services/config';

const app = express();
const PORT = config.port;

const main = async () => {
    // middlewares
    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(morgan('common'));

    // routes
    app.use('/api/translations/', translations);

    // run server
    app.listen(PORT, () => console.log('Run on port:', PORT));
};

main().catch(console.error);
