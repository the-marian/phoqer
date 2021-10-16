import { Themes } from '../interfaces';

const backend = 'http://backend:8001';
const ws = process.env.NODE_ENV === 'development' ? 'ws://dev.phoqer.com/api/' : 'ws://phoqer.com/api/';
const host = process.env.NODE_ENV === 'development' ? 'http://dev.phoqer.com' : '';
const api = host + '/api/';

const config = {
    baseUrl: {
        development: (version = 'v1'): string => api + version,
        test: (version = 'v1'): string => api + version,
        production: (version = 'v1'): string => (process.browser ? api + version : backend),
    },
    socketUrl: (version = 'v1'): string => ws + version,
    uploadsUrl: (version = 'v2'): string => `${api}${version}/upload`,
    host: (lang = 'pl'): string => `${host}/${lang}`,
    img: host,
    themes: ['white', 'black'] as Themes[],
    googleApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    appSecretKey: process.env.NEXT_PUBLIC_SECRET_KEY,
};

export default config;
