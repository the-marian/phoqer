const endpointsMap = {
    ssr: (path = ''): string => (process.env.NEXT_PUBLIC_API_SSR || 'http://dev.phoqer.com/api/v2') + path,
    browser: (path = ''): string => (process.env.NEXT_PUBLIC_API_BROWSER || '') + path,
};

const endpoint = endpointsMap[process.browser ? 'browser' : 'ssr'];

export default endpoint;
