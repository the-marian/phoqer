import axios from 'axios';
import { createPrivateApiClient, createPublicApiClient } from 'phoqer-shared';

import { env } from '@app/config/env.config';
import { TOKEN_KEY } from '@app/constants/auth.constants';

export const publicApiClient = createPublicApiClient(axios, { baseURL: env.PHOQER_BE_HOST });
export const privateApiClient = createPrivateApiClient({
    axios,
    key: TOKEN_KEY,
    config: { baseURL: env.PHOQER_BE_HOST },
    refreshEndpoint: '/auth/refresh',
});
