import { Themes } from '../interfaces';

const config = {
    baseUrl: {
        development: (version = 'v1'): string => 'http://phoqer.com/api/' + version,
        test: (version = 'v1'): string => 'http://phoqer.com/api/' + version,
        production: (version = 'v1'): string => (process.browser ? 'http://phoqer.com/api/' + version : 'http://backend:8001'),
    },
    socketUrl: (version = 'v1'): string => 'ws://phoqer.com/api/' + version,
    uploadsUrl: (version = 'v2'): string => `http://phoqer.com/api/${version}/upload`,
    host: (lang = 'pl'): string => `http://phoqer.com${lang === 'pl' ? '' : '/' + lang}`,
    img: 'http://phoqer.com',
    themes: ['white', 'black'] as Themes[],
    googleApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    appSecretKey: process.env.NEXT_PUBLIC_SECRET_KEY,
};

export default config;
