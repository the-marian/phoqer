const env = {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL || 'http://dev.phoqer.com',
    NEXT_PUBLIC_WS: process.env.NEXT_PUBLIC_WS || 'ws://dev.phoqer.com/api/v1',
    NEXT_PUBLIC_GOOGLE_MAP_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || '',
    NEXT_PUBLIC_SECRET_KEY: process.env.NEXT_PUBLIC_SECRET_KEY || '',
};

export default env;
