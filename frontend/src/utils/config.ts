import { IConfig, Themes } from '../interfaces';

const config = {
    host: (lang = 'pl'): string => `${process.env.NEXT_PUBLIC_URL || 'http://dev.phoqer.com'}/${lang}`,
    img: process.env.NEXT_PUBLIC_URL || 'http://dev.phoqer.com',
    socketUrl: process.env.NEXT_PUBLIC_WS || 'ws://dev.phoqer.com/api/v1',
    themes: ['white', 'black'] as Themes[],
    googleApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    appSecretKey: process.env.NEXT_PUBLIC_SECRET_KEY,
    siteConfig: {
        warning: true,
        hideSearchFilters: false,
        hideTopSearchQuery: false,
        hideTopOffers: true,
        offerCardSize: 'big',
    } as IConfig,
};

export default config;
