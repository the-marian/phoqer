import { Themes } from '../interfaces';

const ws = process.browser ? `ws://${window.location.host}/api/` : 'ws://phoqer.com/api/';

const config = {
    socketUrl: (version = 'v1'): string => ws + version,
    uploadsUrl: (version = 'v2'): string => `/${version}/upload`,
    host: (lang = 'pl'): string => `/${lang}`,
    img: 'http://phoqer.com',
    themes: ['white', 'black'] as Themes[],
    googleApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    appSecretKey: process.env.NEXT_PUBLIC_SECRET_KEY,
};

export default config;
