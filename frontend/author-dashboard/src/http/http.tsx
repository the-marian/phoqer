import axios from 'axios';
import { createPrivateApiClient } from 'phoqer-shared';

import { env } from 'src/config/env.config';
import { TOKEN_KEY } from 'src/constants/auth.constants';

export const privateApiClient = createPrivateApiClient({
    axios,
    key: TOKEN_KEY,
    config: { baseURL: env.PHOQER_BE_HOST },
    refreshEndpoint: '/auth/refresh',
});
