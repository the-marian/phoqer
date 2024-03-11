import axios from 'axios';

import { env } from 'src/config/env.config';

export const http = axios.create({
    withCredentials: true,
    baseURL: env.PHOQER_BE_HOST,
});
