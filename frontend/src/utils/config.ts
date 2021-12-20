import { IConfig, Themes } from '../interfaces';

import env from './env';

const config = {
    host: (lang = 'pl'): string => `${env.NEXT_PUBLIC_URL}/${lang}`,
    socketUrl: env.NEXT_PUBLIC_WS,
    themes: ['white', 'black'] as Themes[],
    googleApiKey: env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    appSecretKey: env.NEXT_PUBLIC_SECRET_KEY,
    siteConfig: {
        warning: true,
        hideSearchFilters: false,
        hideTopSearchQuery: false,
        hideTopOffers: true,
        offerCardSize: 'big',
    } as IConfig,
};

export default config;
